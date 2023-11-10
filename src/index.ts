import routers from './routes';
import { Env } from './interfaces';
import { fshareApiController } from './controllers/api';

export default {
  async fetch(request: Request, env: Env) {
    return routers.handle(request, env);
  },
  async scheduled(_: Event, env: Env) {
    await fshareApiController.refreshTokenFshare(env);
  },
};
