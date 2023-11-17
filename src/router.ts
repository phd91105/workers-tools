import { bodyparser, Router } from 'cloudworker-router';

import { apiController, webController } from '@/controllers';
import {
  allowedMethod,
  assetHandler,
  errorHandler,
  proxyHandler,
} from '@/middlewares';
import { Env } from '@/types';

const router = new Router<Env>();

/**
 * Use the body parser middleware to parse the request body.
 */
router.use(bodyparser);

/**
 * fshare web routers
 */
router.get('/fshare', allowedMethod, webController.fshare.index);

/**
 * fshare api routers
 */
router.post(
  '/fshare/getFile',
  allowedMethod,
  apiController.fshare.getFileFshare,
);
router.post(
  '/fshare/getFolder',
  allowedMethod,
  apiController.fshare.getFolderFshare,
);
router.get('/fshare/login', apiController.fshare.loginFshare);
router.get('/fshare/refresh', apiController.fshare.refreshTokenFshare);

/**
 * film api routers
 */
router.post('/film/search', allowedMethod, apiController.film.search);

/**
 * google search api routers
 */
router.post(
  '/google/customSearch',
  allowedMethod,
  apiController.google.customSearch,
);

/**
 * Proxy handler
 */
router.get('/proxy/:link*', allowedMethod, proxyHandler);

/**
 * Handle public files
 */
router.use(assetHandler);

/**
 * Error handler
 */
router.use(errorHandler);

export default router;
