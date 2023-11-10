import { Router } from '../handlers';
import { fshareApiController, filmApiController } from '../controllers/api';
import { RouteRequest } from '../interfaces';
import { HttpStatus } from '../enums';
import * as fsController from '../controllers';
import * as assets from '../controllers/assets';

const router = new Router();

// fs api
router.get('/fshare/login', () => fshareApiController.loginFshare(router.env));
router.get('/fshare/refresh', () =>
  fshareApiController.refreshTokenFshare(router.env),
);
router.post('/fshare/getFile', ({ request }: RouteRequest) =>
  fshareApiController.getFileFshare(request, router.env),
);
router.post('/fshare/getFolder', ({ request }: RouteRequest) =>
  fshareApiController.getFolderFshare(request, router.env),
);

// film api
router.post('/film/search', ({ request }: RouteRequest) =>
  filmApiController.search(request, router.env),
);

// web
router.get('/', fsController.home);
router.get('/assets/js/main.js', assets.js);
router.get('/assets/css/style.css', assets.css);

// not found
router.all('*', () =>
  Response.json(
    { code: HttpStatus.NOT_FOUND, error: HttpStatus[404] },
    { status: HttpStatus.NOT_FOUND },
  ),
);

export default router;
