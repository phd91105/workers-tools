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
} from '@/factory/types';
import { handleApiRequest } from '@/utils';

/**
 * Perform a login operation to FShare.
 */
export async function login(env: Env) {
  const fshareEnv = JSON.parse(
    (await env.FS.get(FS_ENV, { cacheTtl: 1800 })) ?? '{}',
  );

  const data = await handleApiRequest<FshareAuthResponse>(
    fetch(baseURL + fshareApiUrl.login, {
      method: 'post',
      body: JSON.stringify({
        user_email: fshareEnv.EMAIL,
        password: fshareEnv.PASSWORD,
        app_key: fshareEnv.APP_KEY,
      }),
      headers: commonHeaders(fshareEnv.USER_AGENT),
    }),
  );

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
    env.FS.get(TOKEN_KEY, { cacheTtl: 1800 }),
    env.FS.get(FS_ENV, { cacheTtl: 1800 }),
  ]);

  const fshareEnvJson = JSON.parse(fshareEnv!);

  const data = await handleApiRequest<FshareAuthResponse>(
    fetch(baseURL + fshareApiUrl.refreshToken, {
      method: 'post',
      body: JSON.stringify({ token, app_key: fshareEnvJson.APP_KEY }),
      headers: commonHeaders(fshareEnvJson.USER_AGENT),
    }),
  );

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
    env.FS.get(TOKEN_KEY, { cacheTtl: 1800 }),
    env.FS.get(SESSION_KEY, { cacheTtl: 1800 }),
  ]);

  return handleApiRequest<FshareFileResponse>(
    fetch(baseURL + fshareApiUrl.download, {
      method: 'post',
      body: JSON.stringify({ ...file, token, zipflag: 0 }),
      headers: {
        ...commonHeaders(),
        Cookie: `session_id=${sessionId}`,
      },
    }),
  );
}

/**
 * Get information about a folder from FShare.
 */
export async function getFolder(code: string) {
  const url = new URL(`${getFolderURL}${fshareApiUrl.getFolder}`);
  url.searchParams.append('linkcode', code);
  url.searchParams.append('sort', 'type,name');

  return handleApiRequest(
    fetch(url, {
      headers: { ...commonHeaders() },
    }),
  );
}
