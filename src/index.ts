import { type ExecutionContext } from '@cloudflare/workers-types';

import { type Env } from './interfaces';
import router from './router';
import { fshareServices } from './services';

/**
 * Main serverless handler for Cloudflare Workers.
 */
export default {
  /**
   * Handle incoming HTTP requests.
   *
   * @param {Request} request - The incoming HTTP request.
   * @param {Env} env - The Cloudflare Workers environment object.
   * @param {ExecutionContext} context - The Cloudflare Workers execution context.
   */
  async fetch(request: Request, env: Env, context: ExecutionContext) {
    return await router.handle(request, env, context);
  },

  /**
   * Refresh the token at scheduled intervals.
   *
   * @param {Event} event - The scheduled event (unused in this case).
   * @param {Env} env - The Cloudflare Workers environment object.
   */
  async scheduled(event: Event, env: Env) {
    await fshareServices.refreshToken(env);
  },
};
