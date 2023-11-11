import { type ContextWithBody, type Next } from 'cloudworker-router';

import { type Env } from '../../interfaces';
import { fshareServices } from '../../services';

export async function loginFshare(ctx: ContextWithBody<Env>, next: Next) {
  try {
    const data = await fshareServices.login(ctx.env);
    return Response.json(data);
  } catch (error) {
    ctx.state.error = error;

    return await next();
  }
}

export async function refreshTokenFshare(
  ctx: ContextWithBody<Env>,
  next: Next,
) {
  try {
    const data = await fshareServices.refreshToken(ctx.env);
    return Response.json(data);
  } catch (error) {
    ctx.state.error = error;

    return await next();
  }
}

export async function getFileFshare(ctx: ContextWithBody<Env>, next: Next) {
  try {
    const data = await fshareServices.getLink(ctx.body, ctx.env);
    return Response.json(data);
  } catch (error) {
    ctx.state.error = error;

    return await next();
  }
}

export async function getFolderFshare(ctx: ContextWithBody<Env>, next: Next) {
  try {
    const data = await fshareServices.getFolder(ctx.body.code);
    return Response.json(data);
  } catch (error) {
    ctx.state.error = error;

    return await next();
  }
}
