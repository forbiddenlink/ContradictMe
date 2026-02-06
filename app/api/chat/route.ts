import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    // Check if Agent Studio endpoint is configured
    const agentEndpoint = process.env.NEXT_PUBLIC_ALGOLIA_AGENT_ENDPOINT;

    if (!agentEndpoint) {
      return NextResponse.json({
        message: "The Agent Studio endpoint isn't configured yet. Please set up your environment variables.",
        arguments: [],
      });
    }

    // Validate required environment variables
    const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
    const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY;

    if (!appId || !apiKey) {
      return NextResponse.json({
        message:
          'Configuration error: Missing Algolia credentials. Please check your environment variables.',
        arguments: [],
      });
    }

    // Build the endpoint URL with required query parameters
    const url = new URL(agentEndpoint);
    // Ensure stream is a boolean value
    url.searchParams.set('stream', 'false');
    // Add compatibility mode for ai-sdk-5 format
    url.searchParams.set('compatibilityMode', 'ai-sdk-5');

    // Call Algolia Agent Studio API (ai-sdk-5 format with parts)
    const response = await fetch(url.toString(), {
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
            parts: [
              {
                text: message,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Agent API returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();

    // Extract text from parts array
    let responseText = 'No response from agent';
    if (data.parts && Array.isArray(data.parts)) {
      const textParts = data.parts.filter(
        (part: { type?: string; text?: string }) => part.type === 'text' || part.text
      );
      responseText = textParts.map((part: { text: string }) => part.text).join('\n');
    } else if (data.text) {
      responseText = data.text;
    } else if (data.response) {
      responseText = data.response;
    } else if (data.message) {
      responseText = data.message;
    }

    // Return the agent's response
    return NextResponse.json({
      message: responseText,
      arguments: data.arguments || [],
    });
  } catch (error) {
    // Log error in development only
    if (process.env.NODE_ENV === 'development') {
      console.error('Chat API error:', error);
    }
    return NextResponse.json(
      {
        message: `Sorry, I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        arguments: [],
      },
      { status: 200 } // Return 200 so the frontend shows the error message
    );
  }
}
