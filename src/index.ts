import router from '@/router';
import { fshareServices } from '@/services';
import { Env } from '@/types';

/**
 * Main serverless handler for Cloudflare Workers.
 */
const handler = {
  // Handle incoming HTTP requests.
  async fetch(request: Request, env: Env, context: ExecutionContext) {
    const response = await router.handle(request, env, context);
    return response;
  },

  // Handle scheduled intervals events.
  async scheduled(_event: Event, env: Env) {
    await fshareServices.refreshToken(env);
  },
};

export default handler;
