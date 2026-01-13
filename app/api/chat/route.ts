import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { message, conversationId } = await req.json();

    console.log('Received message:', message);

    // Check if Agent Studio endpoint is configured
    const agentEndpoint = process.env.NEXT_PUBLIC_ALGOLIA_AGENT_ENDPOINT;
    
    if (!agentEndpoint) {
      return NextResponse.json({
        message: "I'm still being set up! 🚧\n\nThe Agent Studio endpoint isn't configured.",
        arguments: []
      });
    }

    console.log('Calling Algolia Agent Studio at:', agentEndpoint);

    // Call Algolia Agent Studio API (ai-sdk-5 format with parts)
    const response = await fetch(agentEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Algolia-Application-Id': process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
        'X-Algolia-API-Key': process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY!,
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            parts: [
              {
                text: message
              }
            ]
          }
        ]
      }),
    });

    console.log('Agent response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Agent API error:', errorText);
      throw new Error(`Agent API returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('Agent response data:', data);

    // Extract text from parts array
    let responseText = 'No response from agent';
    if (data.parts && Array.isArray(data.parts)) {
      const textParts = data.parts.filter((part: any) => part.type === 'text' || part.text);
      responseText = textParts.map((part: any) => part.text).join('\n');
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
    console.error('Chat API error:', error);
    return NextResponse.json(
      { 
        message: `Sorry, I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        arguments: []
      },
      { status: 200 } // Return 200 so the frontend shows the error message
    );
  }
}

