import { Env, FshareFile } from '../../interfaces';
import { FshareServices } from '../../services/fshare';

export class FshareApiController {
  private readonly fshareServices: FshareServices;

  constructor() {
    this.fshareServices = new FshareServices();
  }

  async loginFshare(env: Env) {
    const data = await this.fshareServices.login(env);
    return Response.json(data);
  }

  async refreshTokenFshare(env: Env) {
    const data = await this.fshareServices.refreshToken(env);
    return Response.json(data);
  }

  async getFileFshare(request: Request, env: Env) {
    const body: FshareFile = await new Response(request.body).json();
    const data = await this.fshareServices.getLink(body, env);
    return Response.json(data);
  }

  async getFolderFshare(request: Request, env: Env) {
    const body: { code: string } = await new Response(request.body).json();
    const data = await this.fshareServices.getFolder(body.code, env);
    return Response.json(data);
  }
}
