import { type Context } from 'cloudworker-router';

import notFound from '../../views/errors/notFound.html';
import { HttpStatus } from '../enums';
import { type Env } from '../interfaces';

export const errorsHandler = async (ctx: Context<Env>) => {
  if (ctx.state.error) {
    return Response.json(
      { error: ctx.state?.error?.message },
      { status: HttpStatus.BAD_REQUEST },
    );
  }

  return new Response(notFound, {
    status: HttpStatus.NOT_FOUND,
    headers: {
      'content-type': 'text/html',
    },
  });
};
