import { Context, Next } from 'cloudworker-router';

import { Env } from '@/types';
import { determineContentType } from '@/utils';

/**
 * Public asset files Handler
 */
export const assetHandler = async (context: Context<Env>, next: Next) => {
  if (context.request.method === 'OPTIONS') {
    return next();
  }

  try {
    const path = context.params['0'];
    const file = await context.env.FILE.get(path);
    if (!file) throw new Error('NOT_FOUND');

    return new Response(file, {
      headers: {
        'content-type': determineContentType(path),
        'cache-control': 'max-age=2592000',
      },
    });
  } catch (error) {
    context.state.error = error;
    return next();
  }
};
