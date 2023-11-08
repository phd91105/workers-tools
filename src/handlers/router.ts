export class Router {
  routes: any[] = [];
  env: any;

  handle(request: Request, env: any) {
    this.env = env;

    for (const route of this.routes) {
      const match = route[0](request);
      if (match) {
        return route[1]({ ...match, request });
      }
    }
    const match = this.routes.find(([matcher]) => matcher(request));
    if (match) {
      return match[1](request);
    }
  }

  register(handler: any, path: any, method?: string) {
    const urlPattern = new URLPattern({ pathname: path });

    this.routes.push([
      (request: { method: string; url: string | URL }) => {
        if (method === undefined || request.method.toLowerCase() === method) {
          const match = urlPattern.exec({
            pathname: new URL(request.url).pathname,
          });

          if (match) {
            return { params: match.pathname.groups };
          }
        }
      },

      (args: any) => handler(args),
    ]);
  }

  options(path: any, handler: any) {
    this.register(handler, path, 'options');
  }

  head(path: any, handler: any) {
    this.register(handler, path, 'head');
  }

  get(path: string, handler: any) {
    this.register(handler, path, 'get');
  }

  post(path: any, handler: any) {
    this.register(handler, path, 'post');
  }

  put(path: any, handler: any) {
    this.register(handler, path, 'put');
  }

  patch(path: any, handler: any) {
    this.register(handler, path, 'patch');
  }

  delete(path: any, handler: any) {
    this.register(handler, path, 'delete');
  }

  all(path: string, handler: any) {
    this.register(handler, path);
  }
}
