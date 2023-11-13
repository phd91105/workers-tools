import { type ContextWithBody, type Next } from 'cloudworker-router';

import { type Env } from '../../interfaces';
import { googleServices } from '../../services';

/**
 * Perform a custom search using the Google Services.
 */
export async function customSearch(context: ContextWithBody<Env>, next: Next) {
  try {
    const [firstResult, nextResult] = await Promise.all([
      googleServices.customSearch(context.body.keyword),
      googleServices.customSearch(context.body.keyword, 10),
    ]);

    return Response.json([...firstResult, ...nextResult]);
  } catch (error) {
    context.state.error = error;

    return await next();
  }
}
