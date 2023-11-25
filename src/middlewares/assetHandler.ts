import { Context, Next } from 'cloudworker-router';

import { Env } from '@/factory/types';
import { Base64Utils, determineContentType } from '@/utils';

/**
 * Public asset files Handler
 */
export const assetHandler = async (context: Context<Env>, next: Next) => {
  const path = context.params['0'];
  if (context.request.method === 'OPTIONS' || !path.includes('.')) {
    return next();
  }

  try {
    let file: string | Blob | null = await context.env.FILE.get(path);

    if (!file) throw new Error('NOT_FOUND');

    if (path.endsWith('.zip')) {
      file = Base64Utils.base64ToBlob(file, 'application/zip');
      await context.env.FILE.delete(path);
    } else if (path.endsWith('_gen.png')) {
      file = Base64Utils.base64ToBlob(file, 'image/png');
      await context.env.FILE.delete(path);
    }

    return new Response(file, {
      headers: {
        ...context.headers,
        'content-type': determineContentType(path),
        'cache-control': 'max-age=2592000',
      },
    });
  } catch (error) {
    context.state.error = error;
    return next();
  }
};
