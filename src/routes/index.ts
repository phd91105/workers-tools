import { makeJSONResponse } from "../utils";
import { getFileFshare, loginFshare, refreshTokenFshare } from "../controllers";
import { Env } from "../interfaces";

/**
 * @param {Request} request
 * @return {Promise<Response>}
 */
export async function handleRequest(
  request: Request,
  env: Env
): Promise<Response> {
  const { pathname } = new URL(request.url);
  if (pathname === `/fshare/login`) {
    const data = await loginFshare(env);

    return makeJSONResponse(data);
  }

  if (pathname === `/fshare/refresh`) {
    const data = await refreshTokenFshare(env);

    return makeJSONResponse(data);
  }

  if (pathname === `/fshare/getFile`) {
    const data = await getFileFshare(
      {
        url: "https://www.fshare.vn/file/KEZJE3YDOYIG",
        password: "",
      },
      env
    );

    return makeJSONResponse(data);
  }

  return makeJSONResponse(
    {
      error: `Not found router for [${pathname}]`,
    },
    { status: 404 }
  );
}
