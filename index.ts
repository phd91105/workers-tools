import { handleRequest } from "./src/routes";
import { initEnv } from "./LoadEnv";
import { Env } from "./src/interfaces";

export default {
  async fetch(request: Request, env: Env) {
    initEnv(env);
    return await handleRequest(request, env);
  },
};
