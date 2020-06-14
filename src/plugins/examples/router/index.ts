import Iris from '@/core/iris';

function getUrl(baseUrl?: string) {
  return window.location.href.replace(`${window.location.origin}${baseUrl || ''}`, '');
}

function fireEvents(event: string, args: any) {}

class View {
  id = 'router.view';

  state = {
    route: getUrl(Router.baseUrl),
  };

  onInit() {
    const instance: View = this;

    const pushState = history.pushState;

    history.pushState = function () {
      pushState.apply(history, arguments as any);
      fireEvents('pushState', arguments);
    };

    window.onpopstate = () => {
      const route = getUrl(Router.baseUrl);

      (instance as any).setState({
        route,
      });
    };
  }

  render(h: THyperscript) {
    return h(
      'div',
      null,
      h((this as any).$router.routes.find((view: any) => view.path === this.state.route).component, {
        key: this.state.route,
      })
    );
  }
}

class Router {
  static baseUrl: string;

  routes: IRoute[];

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
        routes: this.routes,
        View,
      },
    };
  }

  injectIntoIris() {
    return {
      Router: View
    }
  }
}

export default Router;
