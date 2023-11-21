import { Context, Next } from 'cloudworker-router';

import { Env } from '@/factory/types';

/**
 * proxyHandler
 */
export const proxyHandler = async (context: Context<Env>, next: Next) => {
  try {
    const { headers, body } = await fetch(context.params.link, {
      method: context.request.method,
      headers: context.request.headers,
    });

    return new Response(body, {
      headers,
    });
  } catch (error) {
    context.state.error = error;
    return next();
  }
};
