import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

export function proxy(request: NextRequest) {
  // Generate a unique nonce for this request
  const nonce = Buffer.from(nanoid()).toString('base64');

  // Build CSP with nonce for scripts and styles
  const isDev = process.env.NODE_ENV !== 'production';

  const scriptSrc = [
    "'self'",
    `'nonce-${nonce}'`,
    "'strict-dynamic'",
    ...(isDev ? ["'unsafe-eval'"] : []),
  ].join(' ');

  const connectSrc = [
    "'self'",
    ...(isDev ? ['ws:', 'wss:'] : []),
    'https://*.algolia.net',
    'https://*.algolianet.com',
    'https://ai-sdk-5.api.algolia.com',
    'https://vitals.vercel-analytics.com',
    'https://vercel.live',
  ].join(' ');

  const cspHeader = `
    default-src 'self';
    script-src ${scriptSrc};
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' data: blob: https:;
    font-src 'self' data:;
    connect-src ${connectSrc};
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `
    .replace(/\\s{2,}/g, ' ')
    .trim();

  // Add nonce to request headers so we can access it in pages
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', cspHeader);

  // Create response with updated headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Set CSP header on response
  response.headers.set('Content-Security-Policy', cspHeader);

  // Add HSTS header for security
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');

  return response;
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files with extensions
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)/',
  ],
};
