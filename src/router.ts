import { bodyparser, Router } from 'cloudworker-router';

import { fsController } from './controllers';
import {
  filmApiController,
  fshareApiController,
  googleApiController,
} from './controllers/api';
import { assetsHandler, errorsHandler } from './handlers';
import { type Env } from './interfaces';

const router = new Router<Env>();

/**
 * Use the body parser middleware to parse the request body.
 */
router.use(bodyparser);

/**
 * fshare web routers
 */
router.get('/fshare', fsController.index);

/**
 * fshare api routers
 */
router.post('/fshare/getFile', fshareApiController.getFileFshare);
router.post('/fshare/getFolder', fshareApiController.getFolderFshare);
router.get('/fshare/login', fshareApiController.loginFshare);
router.get('/fshare/refresh', fshareApiController.refreshTokenFshare);

/**
 * film api routers
 */
router.post('/film/search', filmApiController.search);

/**
 * google search api routers
 */
router.post('/google/customSearch', googleApiController.customSearch);

/**
 * Handle public files
 */
router.all('*', assetsHandler);

/**
 * error handler
 */
router.use(errorsHandler);

export default router;
