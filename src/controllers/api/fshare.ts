import type { ContextWithBody, Next } from 'cloudworker-router';

import type { Env } from '@/factory/types';
import { fshareServices } from '@/services';

/**
 * Login to FShare.
 */
export async function loginFshare(context: ContextWithBody<Env>, next: Next) {
  try {
    const data = await fshareServices.login(context.env);
    return Response.json(data);
  } catch (error) {
    context.state.error = error;

    return next();
  }
}

/**
 * Refresh FShare access token.
 */
export async function refreshTokenFshare(
  context: ContextWithBody<Env>,
  next: Next,
) {
  try {
    const data = await fshareServices.refreshToken(context.env);
    return Response.json(data);
  } catch (error) {
    context.state.error = error;

    return next();
  }
}

/**
 * Get a link for a file from FShare.
 */
export async function getFileFshare(context: ContextWithBody<Env>, next: Next) {
  try {
    const data = await fshareServices.getLink(context.body, context.env);
    return Response.json(data, { headers: context.headers });
  } catch (error) {
    context.state.error = error;

    return next();
  }
}

/**
 * Get information about a folder from FShare.
 */
export async function getFolderFshare(
  context: ContextWithBody<Env>,
  next: Next,
) {
  try {
    const data = await fshareServices.getFolder(context.body.code);
    return Response.json(data, { headers: context.headers });
  } catch (error) {
    context.state.error = error;

    return next();
  }
}
