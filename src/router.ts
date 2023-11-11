import { bodyparser, Router } from 'cloudworker-router';

import { fsController } from './controllers';
import {
  filmApiController,
  fshareApiController,
  googleApiController,
} from './controllers/api';
import { errorsHandler } from './handlers';
import { type Env } from './interfaces';

const router = new Router<Env>();

router.use(bodyparser);

// fs api
router.get('/fshare/login', fshareApiController.loginFshare);
router.get('/fshare/refresh', fshareApiController.refreshTokenFshare);
router.post('/fshare/getFile', fshareApiController.getFileFshare);
router.post('/fshare/getFolder', fshareApiController.getFolderFshare);
// fshare web
router.get('/fshare', fsController.index);
// film api
router.post('/film/search', filmApiController.search);
// gg search
router.post('/google/customSearch', googleApiController.customSearch);

// error handler
router.use(errorsHandler);

export default router;
