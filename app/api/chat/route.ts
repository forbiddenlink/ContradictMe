import { NextRequest } from 'next/server';

const MAX_MESSAGE_LENGTH = 8000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 25;
const AGENT_TIMEOUT_MS = 30_000;

type RateLimitState = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitState>();

const jsonHeaders = { 'Content-Type': 'application/json' };

function getClientId(req: NextRequest): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();
  return req.headers.get('x-real-ip') ?? 'anonymous';
}

function isRateLimited(clientId: string): boolean {
  const now = Date.now();

  // Opportunistically clean old buckets to keep memory bounded.
  for (const [key, value] of rateLimitStore.entries()) {
    if (value.resetAt <= now) rateLimitStore.delete(key);
  }

  const existing = rateLimitStore.get(clientId);
  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(clientId, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) return true;
  existing.count += 1;
  rateLimitStore.set(clientId, existing);
  return false;
}

function errorResponse(status: number, error: string): Response {
  return new Response(JSON.stringify({ error, arguments: [] }), {
    status,
    headers: jsonHeaders,
  });
}

function extractTextPayload(parsed: unknown): string {
  if (!parsed || typeof parsed !== 'object') return '';

  const data = parsed as {
    type?: string;
    delta?: string | { text?: string };
    textDelta?: string;
    output_text?: string;
    content?: string | Array<{ type?: string; text?: string }>;
    value?: string;
    parts?: Array<{ type?: string; text?: string }>;
    text?: string;
    choices?: Array<{ delta?: { content?: string } }>;
    response?: string | { text?: string };
    message?: string | { content?: string | Array<{ text?: string }> };
  };

  // Handle common stream chunk formats: {"type":"text-delta","delta":"..."}
  if (data.type?.includes('delta') && typeof data.delta === 'string') {
    return data.delta;
  }

  if (Array.isArray(data.parts)) {
    return data.parts
      .filter((part) => part.type === 'text' || Boolean(part.text))
      .map((part) => part.text ?? '')
      .join('');
  }
  if (data.text) return data.text;
  if (data.textDelta) return data.textDelta;
  if (data.output_text) return data.output_text;
  if (typeof data.content === 'string') return data.content;
  if (Array.isArray(data.content)) {
    return data.content
      .filter((part) => part.type === 'text' || Boolean(part.text))
      .map((part) => part.text ?? '')
      .join('');
  }
  if (data.type?.includes('delta') && typeof data.value === 'string') return data.value;
  if (typeof data.delta === 'object' && data.delta?.text) return data.delta.text;
  if (data.choices?.[0]?.delta?.content) return data.choices[0].delta.content;
  if (typeof data.response === 'string') return data.response;
  if (data.response && typeof data.response === 'object' && data.response.text) {
    return data.response.text;
  }
  if (typeof data.message === 'string') return data.message;
  if (data.message && typeof data.message === 'object') {
    if (typeof data.message.content === 'string') return data.message.content;
    if (Array.isArray(data.message.content)) {
      return data.message.content.map((part) => part.text ?? '').join('');
    }
  }
  return '';
}

export async function POST(req: NextRequest) {
  const clientId = getClientId(req);
  if (isRateLimited(clientId)) {
    const state = rateLimitStore.get(clientId);
    const retryAfter = state ? Math.ceil((state.resetAt - Date.now()) / 1000) : 60;
    
    return new Response(
      JSON.stringify({
        error: 'Rate limit exceeded. Please wait a minute and try again.',
        arguments: [],
      }),
      {
        status: 429,
        headers: { 
          ...jsonHeaders, 
          'Retry-After': retryAfter.toString(),
          'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': state?.resetAt.toString() || Date.now().toString(),
        },
      }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return errorResponse(400, 'Invalid JSON payload.');
  }

  try {
    const { message, stream = true } = (body ?? {}) as {
      message?: unknown;
      stream?: unknown;
    };

    if (typeof message !== 'string' || !message.trim()) {
      return errorResponse(400, 'Message is required.');
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      return errorResponse(
        413,
        `Message exceeds ${MAX_MESSAGE_LENGTH} characters. Please shorten and try again.`
      );
    }

    // Check if Agent Studio endpoint is configured
    const agentEndpoint =
      process.env.ALGOLIA_AGENT_ENDPOINT || process.env.NEXT_PUBLIC_ALGOLIA_AGENT_ENDPOINT;

    if (!agentEndpoint) {
      return errorResponse(500, "The Agent Studio endpoint isn't configured.");
    }

    // Validate required environment variables
    const appId = process.env.ALGOLIA_APP_ID || process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
    const apiKey =
      process.env.ALGOLIA_SEARCH_API_KEY || process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY;

    if (!appId || !apiKey) {
      return errorResponse(500, 'Configuration error: Missing Algolia credentials.');
    }

    // Build the endpoint URL with required query parameters
    const wantsStream = stream !== false;
    const url = new URL(agentEndpoint);
    url.searchParams.set('stream', wantsStream ? 'true' : 'false');
    url.searchParams.set('compatibilityMode', 'ai-sdk-5');

    // Call Algolia Agent Studio API (ai-sdk-5 format with parts)
    let response: Response;
    try {
      response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Algolia-Application-Id': appId,
          'X-Algolia-API-Key': apiKey,
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              parts: [{ text: message.trim() }],
            },
          ],
        }),
        signal: AbortSignal.timeout(AGENT_TIMEOUT_MS),
      });
    } catch (fetchError) {
      if (fetchError instanceof Error && fetchError.name === 'TimeoutError') {
        return errorResponse(504, 'Agent request timed out. Please retry.');
      }
      return errorResponse(502, 'Failed to reach Agent service.');
    }

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      const detail = errorText ? ` ${errorText.slice(0, 300)}` : '';
      return errorResponse(502, `Agent API returned ${response.status}.${detail}`);
    }

    // Handle streaming response
    if (wantsStream && response.body) {
      // Create a TransformStream to process the SSE events
      const encoder = new TextEncoder();
      const decoder = new TextDecoder();
      let buffer = '';

      const processLine = (line: string, controller: TransformStreamDefaultController) => {
        if (!line.startsWith('data:')) return;

        const data = line.slice(5).trimStart();
        if (!data) return;

        if (data === '[DONE]') {
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          return;
        }

        try {
          const parsed = JSON.parse(data);
          const content = extractTextPayload(parsed);
          if (content) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: content })}\n\n`));
          }
        } catch {
          // Ignore malformed chunks from upstream.
        }
      };

      const transformStream = new TransformStream({
        async transform(chunk, controller) {
          buffer += decoder.decode(chunk, { stream: true });

          let lineBreakIndex = buffer.indexOf('\n');
          while (lineBreakIndex >= 0) {
            const line = buffer.slice(0, lineBreakIndex).replace(/\r$/, '');
            processLine(line, controller);
            buffer = buffer.slice(lineBreakIndex + 1);
            lineBreakIndex = buffer.indexOf('\n');
          }
        },
        flush(controller) {
          const finalText = decoder.decode();
          if (finalText) buffer += finalText;
          if (buffer.trim().length > 0) {
            processLine(buffer.replace(/\r$/, ''), controller);
          }
        },
      });

      return new Response(response.body.pipeThrough(transformStream), {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache, no-transform',
          Connection: 'keep-alive',
          'X-Accel-Buffering': 'no',
        },
      });
    }

    // Non-streaming fallback
    const data = await response.json().catch(() => ({}));
    const responseText = extractTextPayload(data) || 'No response from agent.';

    return new Response(
      JSON.stringify({
        message: responseText,
        arguments: (data as { arguments?: unknown[] }).arguments || [],
      }),
      { status: 200, headers: jsonHeaders }
    );
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Chat API error:', error);
    }
    return errorResponse(
      500,
      `Sorry, I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}
