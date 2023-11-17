import { Context, Next } from 'cloudworker-router';

import { Env } from '@/types';

/**
 * allowedMethod
 */
export const allowedMethod = async (context: Context<Env>, next: Next) => {
  const isOPTIONS = context.request.method == 'OPTIONS';
  context.headers = new Headers(context.request.headers);
  context.headers.set('Access-Control-Allow-Origin', '*');

  if (isOPTIONS) {
    context.headers.set('Access-Control-Allow-Methods', '*');
    const acrh = context.request.headers.get('access-control-request-headers');

    if (acrh) {
      context.headers.set('Access-Control-Allow-Headers', acrh);
    }
    context.headers.delete('X-Content-Type-Options');
  }

  return next();
};
