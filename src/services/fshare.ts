import {
  baseURL,
  fshareApiUrl,
  fshareAccount,
  commonHeaders,
} from "../configs";
import { Env, FshareFile } from "../interfaces";
import { ENV, SESSION_KEY, TOKEN_KEY } from "../../LoadEnv";

export const FshareServices = () => {
  const login = async (env: Env) => {
    const response = await fetch(baseURL + fshareApiUrl.login, {
      method: "post",
      body: JSON.stringify(fshareAccount),
      headers: commonHeaders,
    });

    const data: { token: string; session_id: string } = await response.json();
    await Promise.all([
      env.FS.put(TOKEN_KEY, data.token),
      env.FS.put(SESSION_KEY, data.session_id),
    ]);

    return data;
  };

  const refreshToken = async (env: Env) => {
    const token = await env.FS.get(TOKEN_KEY);
    const response = await fetch(baseURL + fshareApiUrl.refreshToken, {
      method: "post",
      body: JSON.stringify({ token, app_key: ENV.APP_KEY }),
      headers: commonHeaders,
    });

    const data: { token: string; session_id: string } = await response.json();
    await Promise.all([
      env.FS.put(TOKEN_KEY, data.token),
      env.FS.put(SESSION_KEY, data.session_id),
    ]);

    return data;
  };

  const getLink = async (file: FshareFile, env: Env) => {
    const [token, sessionId] = await Promise.all([
      env.FS.get(TOKEN_KEY),
      env.FS.get(SESSION_KEY),
    ]);

    const response = await fetch(baseURL + fshareApiUrl.download, {
      method: "post",
      body: JSON.stringify({
        ...file,
        token,
        zipflag: 0,
      }),
      headers: { ...commonHeaders, Cookie: `session_id=${sessionId}` },
    });

    const data: { location: string } = await response.json();

    return data;
  };

  return {
    login,
    refreshToken,
    getLink,
  };
};
