import {
  baseURL,
  commonHeaders,
  FS_ENV,
  fshareApiUrl,
  getFolderURL,
  SESSION_KEY,
  TOKEN_KEY,
} from '@/contants';
import {
  Env,
  FshareAuthResponse,
  FshareFile,
  FshareFileResponse,
} from '@/types';

/**
 * Perform a login operation to FShare.
 */
export async function login(env: Env) {
  const fshareEnv = await env.FS.get(FS_ENV);
  const fshareEnvJson = JSON.parse(fshareEnv!);

  const response = await fetch(baseURL + fshareApiUrl.login, {
    method: 'post',
    body: JSON.stringify({
      user_email: fshareEnvJson.EMAIL,
      password: fshareEnvJson.PASSWORD,
      app_key: fshareEnvJson.APP_KEY,
    }),
    headers: commonHeaders(fshareEnvJson.USER_AGENT),
  });

  const data: FshareAuthResponse = await response.json();
  await Promise.all([
    env.FS.put(TOKEN_KEY, data.token!),
    env.FS.put(SESSION_KEY, data.session_id!),
  ]);

  return data;
}

/**
 * Refresh the FShare access token.
 */
export async function refreshToken(env: Env) {
  const [token, fshareEnv] = await Promise.all([
    env.FS.get(TOKEN_KEY),
    env.FS.get(FS_ENV),
  ]);

  const fshareEnvJson = JSON.parse(fshareEnv!);

  const response = await fetch(baseURL + fshareApiUrl.refreshToken, {
    method: 'post',
    body: JSON.stringify({ token, app_key: fshareEnvJson.APP_KEY }),
    headers: commonHeaders(fshareEnvJson.USER_AGENT),
  });

  const data: FshareAuthResponse = await response.json();
  await Promise.all([
    env.FS.put(TOKEN_KEY, data.token!),
    env.FS.put(SESSION_KEY, data.session_id!),
  ]);

  return data;
}

/**
 * Get a download link for a file from FShare.
 */
export async function getLink(file: FshareFile, env: Env) {
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
      ...commonHeaders(),
      Cookie: `session_id=${sessionId}`,
    },
  });

  const data: FshareFileResponse = await response.json();

  return data;
}

/**
 * Get information about a folder from FShare.
 */
export async function getFolder(code: string) {
  const response = await fetch(
    `${getFolderURL}${fshareApiUrl.getFolder}?` +
      new URLSearchParams({ linkcode: code, sort: 'type,name' }).toString(),
    {
      method: 'get',
      headers: {
        ...commonHeaders(),
      },
    },
  );

  const data = await response.json();

  return data;
}
