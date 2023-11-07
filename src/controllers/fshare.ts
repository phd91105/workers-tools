import { Env, FshareFile } from "../interfaces";
import { FshareServices } from "../services";

const fshareServices = FshareServices();

export const loginFshare = async (env: Env) => {
  const data = await fshareServices.login(env);

  return data;
};

export const refreshTokenFshare = async (env: Env) => {
  const data = await fshareServices.refreshToken(env);

  return data;
};

export const getFileFshare = async (file: FshareFile, env: Env) => {
  const data = await fshareServices.getLink(file, env);

  return data;
};
