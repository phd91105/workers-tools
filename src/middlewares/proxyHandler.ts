import type { ContextWithBody, Next } from 'cloudworker-router';

import type { Env } from '@/factory/types';

/**
 * proxyHandler
 */
export const proxyHandler = async (
  context: ContextWithBody<Env>,
  next: Next,
) => {
  try {
    const url = context.query.get('url');
    if (!url) throw new Error('NOT_FOUND');

    const { headers, body } = await fetch(url, {
      method: context.request.method,
      body: JSON.stringify(context.body),
      headers: context.request.headers,
    });

    return new Response(body, {
      headers: {
        ...headers,
        ...context.headers,
      },
    });
  } catch (error) {
    context.state.error = error;
    return next();
  }
};
