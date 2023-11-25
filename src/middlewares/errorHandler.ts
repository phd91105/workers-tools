import { Context } from 'cloudworker-router';

import { HttpStatus } from '@/factory/enums';
import { Env } from '@/factory/types';

/**
 * Extracts the HTTP status code from an error message.
 */
const getStatus = (errorMessage: string | undefined) => {
  if (errorMessage && errorMessage in HttpStatus) {
    return {
      code: HttpStatus[errorMessage as keyof typeof HttpStatus],
      message: errorMessage,
    };
  }
  return {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'INTERNAL_SERVER_ERROR',
  };
};

/**
 * Handle errors and generate an appropriate HTTP response.
 */
export const errorHandler = async (context: Context<Env>) => {
  const { error } = context.state;
  const { code, message } = getStatus(error.message);

  return Response.json({ error: message }, { status: code });
};
