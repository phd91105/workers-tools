import { type Context } from 'cloudworker-router';

import { HttpStatus } from '../enums';
import { type Env } from '../interfaces';

/**
 * Handle errors and generate an appropriate HTTP response.
 *
 * @param {Context<Env>} context - The Cloudflare Workers context object.
 */
export const errorsHandler = async (context: Context<Env>) => {
  if (context.state.error) {
    return Response.json(
      { error: context.state?.error?.message },
      { status: HttpStatus.BAD_REQUEST },
    );
  }
};
