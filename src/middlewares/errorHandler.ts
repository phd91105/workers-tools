import { notFound } from '@views';
import { Context, Next } from 'cloudworker-router';

import { HttpStatus } from '@/factory/enums';
import { Env } from '@/factory/types';

/**
 * Handle errors and generate an appropriate HTTP response.
 */
export const errorHandler = async (context: Context<Env>, next: Next) => {
  const error = context.state?.error;

  if (error?.message === 'NOT_FOUND') {
    return new Response(notFound, {
      status: HttpStatus.NOT_FOUND,
      headers: {
        'content-type': 'text/html',
      },
    });
  }

  if (error?.message) {
    return Response.json(
      { error: error.message },
      { status: HttpStatus.BAD_REQUEST },
    );
  }

  return next();
};
