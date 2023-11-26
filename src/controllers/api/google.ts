import type { ContextWithBody, Next } from 'cloudworker-router';

import type { Env } from '@/factory/types';
import { googleServices } from '@/services';

/**
 * Perform a custom search using the Google Services.
 */
export async function customSearch(context: ContextWithBody<Env>, next: Next) {
  try {
    const [firstResult, nextResult] = await Promise.all([
      googleServices.customSearch(context.body.keyword),
      googleServices.customSearch(context.body.keyword, 10),
    ]);

    return Response.json([...firstResult, ...nextResult], {
      headers: context.headers,
    });
  } catch (error) {
    context.state.error = error;

    return next();
  }
}
