import View from './view';

class Router {
  routes: IRoute[];
  static baseUrl: string;
  
  constructor({ routes, baseUrl }: IRouterOptions) {
    this.routes = routes;
    Router.baseUrl = baseUrl || '/';
  }

  go(url: string) {
    window.history.pushState('', '', url);

    const view = Iris.components.getUnique('router.view');

    view?.setState({
      route: url.replace(Router.baseUrl, ''),
    });
  }

  injectIntoComponent(): { $router: IRouter } {
    return {
      $router: {
        go: this.go,
        routes: this.routes
      },
    };
  }

  injectIntoIris() {
    return {
      Router: View,
    };
  }
}

export default Router;
