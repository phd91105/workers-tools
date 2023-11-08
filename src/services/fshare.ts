import {
  baseURL,
  fshareApiUrl,
  commonHeaders,
  getFolderURL,
} from '../contants';
import {
  Env,
  FshareAuthResponse,
  FshareFile,
  FshareFileResponse,
} from '../interfaces';
import { FS_ENV, SESSION_KEY, TOKEN_KEY } from '../contants';

export const FshareServices = () => {
  const login = async (env: Env) => {
    const fshareEnv = JSON.parse(await env.FS.get(FS_ENV));

    const response = await fetch(baseURL + fshareApiUrl.login, {
      method: 'post',
      body: JSON.stringify({
        user_email: fshareEnv.EMAIL,
        password: fshareEnv.PASSWORD,
        app_key: fshareEnv.APP_KEY,
      }),
      headers: commonHeaders(fshareEnv.USER_AGENT),
    });

    const data: FshareAuthResponse = await response.json();
    await Promise.all([
      env.FS.put(TOKEN_KEY, data.token),
      env.FS.put(SESSION_KEY, data.session_id),
    ]);

    return data;
  };

  const refreshToken = async (env: Env) => {
    const [token, fshareEnv] = await Promise.all([
      env.FS.get(TOKEN_KEY),
      env.FS.get(FS_ENV),
    ]);

    const fshareEnvJson = JSON.parse(fshareEnv);

    const response = await fetch(baseURL + fshareApiUrl.refreshToken, {
      method: 'post',
      body: JSON.stringify({ token, app_key: fshareEnvJson.APP_KEY }),
      headers: commonHeaders(fshareEnvJson.USER_AGENT),
    });

    const data: FshareAuthResponse = await response.json();
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
      method: 'post',
      body: JSON.stringify({
        ...file,
        token,
        zipflag: 0,
      }),
      headers: {
        ...commonHeaders,
        Cookie: `session_id=${sessionId}`,
      },
    });

    const data: FshareFileResponse = await response.json();

    return data;
  };

  const getFolder = async (code: string, env: Env) => {
    const fshareEnv = JSON.parse(await env.FS.get(FS_ENV));

    const response = await fetch(
      `${getFolderURL}${fshareApiUrl.getFolder}?` +
        new URLSearchParams({ linkcode: code, sort: 'type,name' }).toString(),
      {
        method: 'get',
        headers: {
          ...commonHeaders(fshareEnv.USER_AGENT),
        },
      },
    );

    const data = await response.json();

    return data;
  };

  return {
    login,
    refreshToken,
    getLink,
    getFolder,
  };
};
