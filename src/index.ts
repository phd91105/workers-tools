import { type ExecutionContext } from '@cloudflare/workers-types';

import { type Env } from './interfaces';
import router from './router';
import { fshareServices } from './services';

export default {
  async fetch(request: Request, env: Env, context: ExecutionContext) {
    return await router.handle(request, env, context);
  },
  async scheduled(_: Event, env: Env) {
    await fshareServices.refreshToken(env);
  },
};
