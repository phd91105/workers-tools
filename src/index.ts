import { Env } from '@/factory/types';
import router from '@/router';
import { fshareServices } from '@/services';

/**
 * Main serverless handler for Cloudflare Workers.
 */
const handler = {
  // Handle incoming HTTP requests.
  fetch: (request: Request, env: Env, context: ExecutionContext) =>
    router.handle(request, env, context),

  // Handle scheduled intervals events.
  scheduled: (event: Event, env: Env) => fshareServices.refreshToken(env),
};

export default handler;
