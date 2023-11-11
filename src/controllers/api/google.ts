import { type ContextWithBody, type Next } from 'cloudworker-router';

import { type Env } from '../../interfaces';
import { googleServices } from '../../services';

export async function customSearch(ctx: ContextWithBody<Env>, next: Next) {
  try {
    const [firstResult, nextResult] = await Promise.all([
      googleServices.customSearch(ctx.body.keyword),
      googleServices.customSearch(ctx.body.keyword, 10),
    ]);

    return Response.json([...firstResult, ...nextResult]);
  } catch (error) {
    ctx.state.error = error;

    return await next();
  }
}
