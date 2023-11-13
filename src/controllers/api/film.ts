import { type ContextWithBody, type Next } from 'cloudworker-router';

import { type Env } from '../../interfaces';
import { filmServices } from '../../services';

/**
 * Search for films based on the provided film name.
 */
export async function search(context: ContextWithBody<Env>, next: Next) {
  try {
    const response = await filmServices.search(
      context.body.filmName,
      context.env,
    );
    return Response.json(response);
  } catch (error) {
    context.state.error = error;

    return await next();
  }
}
