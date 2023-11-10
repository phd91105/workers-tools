import { Router } from '../handlers';
import { fshareApiController, filmApiController } from '../controllers/api';
import { RouteRequest } from '../interfaces';
import { HttpStatus } from '../enums';
import * as fsController from '../controllers';
import * as assets from '../controllers/assets';

class MyRouter {
  private router: Router;

  constructor() {
    this.router = new Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // fs api
    this.router.get('/fshare/login', () =>
      fshareApiController.loginFshare(this.router.env),
    );
    this.router.get('/fshare/refresh', () =>
      fshareApiController.refreshTokenFshare(this.router.env),
    );
    this.router.post('/fshare/getFile', ({ request }: RouteRequest) =>
      fshareApiController.getFileFshare(request, this.router.env),
    );
    this.router.post('/fshare/getFolder', ({ request }: RouteRequest) =>
      fshareApiController.getFolderFshare(request, this.router.env),
    );

    // film api
    this.router.post('/film/search', ({ request }: RouteRequest) =>
      filmApiController.search(request, this.router.env),
    );

    // web
    this.router.get('/', fsController.home);
    this.router.get('/assets/js/main.js', assets.js);
    this.router.get('/assets/css/style.css', assets.css);

    // not found
    this.router.all('*', () =>
      Response.json(
        { code: HttpStatus.NOT_FOUND, error: HttpStatus[404] },
        { status: HttpStatus.NOT_FOUND },
      ),
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}

const myRouter = new MyRouter();
export default myRouter.getRouter();
