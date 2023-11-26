import type { Context, Next } from 'cloudworker-router';

import { HttpStatus } from '@/factory/enums';
import type { Env } from '@/factory/types';

/**
 * Middleware to handle CORS in Cloudflare Workers.
 */
export const handleCors = async (
  context: Context<Env>,
  next: Next,
  origin: string = '*',
  methods: string | string[] = '*',
) => {
  const requestMethod = context.request.method;
  const isOptionsRequest = requestMethod === 'OPTIONS';

  // Set common CORS headers
  const responseHeaders = new Headers(context.request.headers);
  responseHeaders.set('Access-Control-Allow-Origin', origin);

  if (isOptionsRequest) {
    // Handle OPTIONS preflight request
    const allowedMethods = Array.isArray(methods)
      ? methods.join(', ')
      : methods;
    responseHeaders.set('Access-Control-Allow-Methods', allowedMethods);

    const requestedHeaders = context.request.headers.get(
      'Access-Control-Request-Headers',
    );
    if (requestedHeaders) {
      responseHeaders.set('Access-Control-Allow-Headers', requestedHeaders);
    }

    // Remove unnecessary header
    responseHeaders.delete('X-Content-Type-Options');

    // Respond to OPTIONS request
    return new Response(null, {
      status: HttpStatus.NO_CONTENT,
      headers: responseHeaders,
    });
  }

  // Set headers for non-OPTIONS requests and pass to next middleware
  context.headers = responseHeaders;
  return next();
};
