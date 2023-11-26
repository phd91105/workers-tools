import { bodyparser, Router } from 'cloudworker-router';

import { apiController, botController, webController } from '@/controllers';
import type { Env } from '@/factory/types';
import {
  assetHandler,
  errorHandler,
  handleCors,
  proxyHandler,
  verifyDiscordRequest,
} from '@/middlewares';

const router = new Router<Env>();

/**
 * Use the body parser middleware to parse the request body.
 */
router.use(bodyparser);

/**
 * CORS (*)
 */
router.use(handleCors);

/**
 * fshare web routers
 */
router.get('/fshare', webController.fshare.index);

/**
 * fshare api routers
 */
router.post('/fshare/getFile', apiController.fshare.getFileFshare);
router.post('/fshare/getFolder', apiController.fshare.getFolderFshare);
router.get('/fshare/login', apiController.fshare.loginFshare);
router.get('/fshare/refresh', apiController.fshare.refreshTokenFshare);

/**
 * film api routers
 */
router.post('/film/search', apiController.film.search);

/**
 * google search api routers
 */
router.post('/google/customSearch', apiController.google.customSearch);

/**
 * Proxy handler
 */
router.all('/proxy', proxyHandler);

/**
 * Download multiple links as zip
 */
router.post('/getZipped', apiController.zip.getZipped);

/**
 * Discord bot webhooks
 */
router.post('/interactions', verifyDiscordRequest, botController.discord);

/**
 * Stable diffusion
 */
router.post('/image', apiController.stableDiffusion.genImage);

/**
 * Handle public files
 */
router.use(assetHandler);

/**
 * Error handler
 */
router.use(errorHandler);

export default router;
