import { Context } from 'cloudworker-router';

import notFound from '../../views/errors/notFound.html';
import { HttpStatus } from '../enums';
import { Env } from '../interfaces';
import { determineContentType } from '../utils';

/**
 * Public asset files Handler
 */
export const assetsHandler = async (context: Context<Env>) => {
  const path = context.params['0'];

  try {
    const file = await context.env.FILE.get(path);

    if (!file) {
      throw new Error();
    }

    return new Response(file, {
      headers: {
        'content-type': determineContentType(path),
        'cache-control': 'max-age=3153600',
      },
    });
  } catch {
    return new Response(notFound, {
      status: HttpStatus.NOT_FOUND,
      headers: {
        'content-type': 'text/html',
      },
    });
  }
};
