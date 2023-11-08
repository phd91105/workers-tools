import routers from './routes';
import { Env } from './interfaces';

export default {
  async fetch(request: Request, env: Env) {
    return routers.handle(request, env);
  },
};
