import { Env, FshareFile } from '../../interfaces';
import { FshareServices } from '../../services';

const fshareServices = FshareServices();

export function FshareApiController() {
  const loginFshare = async (env: Env) => {
    const data = await fshareServices.login(env);

    return Response.json(data);
  };

  const refreshTokenFshare = async (env: Env) => {
    const data = await fshareServices.refreshToken(env);

    return Response.json(data);
  };

  const getFileFshare = async (request: Request, env: Env) => {
    const body: FshareFile = await new Response(request.body).json();
    const data = await fshareServices.getLink(body, env);

    return Response.json(data);
  };

  const getFolderFshare = async (request: Request, env: Env) => {
    const body: { code: string } = await new Response(request.body).json();
    const data = await fshareServices.getFolder(body.code, env);

    return Response.json(data);
  };

  return {
    loginFshare,
    refreshTokenFshare,
    getFileFshare,
    getFolderFshare,
  };
}
