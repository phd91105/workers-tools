import { type ContextWithBody, type Next } from 'cloudworker-router';

import { type Env } from '../../interfaces';
import { filmServices } from '../../services';

export async function search(ctx: ContextWithBody<Env>, next: Next) {
  try {
    const response = await filmServices.search(ctx.body.filmName, ctx.env);
    return Response.json(response);
  } catch (error) {
    ctx.state.error = error;

    return await next();
  }
}
