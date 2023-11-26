import { ContextWithBody, Next } from 'cloudworker-router';

import { NEED_REFRESH } from '@/constants';
import { Env } from '@/factory/types';
import { filmServices } from '@/services';

/**
 * Search for films based on the provided film name.
 */
export async function search(context: ContextWithBody<Env>, next: Next) {
  try {
    const response = await filmServices.search(
      context.body.filmName,
      context.env,
    );

    if (response.status === NEED_REFRESH) {
      context.event.waitUntil(
        filmServices.search(context.body.filmName, context.env, false),
      );
    }

    return Response.json(response, { headers: context.headers });
  } catch (error) {
    context.state.error = error;

    return next();
  }
}
