import { type Env } from './interfaces';
import router from './router';
import { fshareServices } from './services';

/**
 * Main serverless handler for Cloudflare Workers.
 */
const handler = {
  // Handle incoming HTTP requests.
  async fetch(request: Request, env: Env, context: ExecutionContext) {
    return await router.handle(request, env, context);
  },

  // Handle scheduled intervals events.
  async scheduled(event: Event, env: Env) {
    await fshareServices.refreshToken(env);
  },
};

export default handler;
