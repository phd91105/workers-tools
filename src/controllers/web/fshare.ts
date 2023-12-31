import { fsharePage } from '@views';
import type { Context } from 'cloudworker-router';

import { HttpStatus } from '@/factory/enums';
import type { Env } from '@/factory/types';

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
