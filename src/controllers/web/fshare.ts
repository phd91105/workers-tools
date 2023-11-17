import { fsharePage } from '@views';
import { Context } from 'cloudworker-router';

import { HttpStatus } from '@/enums';
import { Env } from '@/types';

/**
 * Render the FShare index page.
 */
export const index = async (context: Context<Env>) => {
  context.headers.set('content-type', 'text/html');
  return new Response(fsharePage, {
    status: HttpStatus.OK,
    headers: context.headers,
  });
};
