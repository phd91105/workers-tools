import { Context } from 'cloudworker-router';

import { HttpStatus } from '@/factory/enums';
import { Env } from '@/factory/types';

/**
 * Handle errors and generate an appropriate HTTP response.
 */
export const errorHandler = async (context: Context<Env>) => {
  const error = context.state?.error;

  if (error) {
    const statusCode = error.message
      ? HttpStatus.BAD_REQUEST
      : HttpStatus.INTERNAL_SERVER_ERROR;

    return Response.json(
      { error: error.message || 'INTERNAL_SERVER_ERROR' },
      {
        status: statusCode,
      },
    );
  }
};
