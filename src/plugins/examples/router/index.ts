import Iris from '@/core/iris';
import hook, { ON_ENTER } from '@/util/hooks';

function getUrl(baseUrl?: string) {
  return window.location.href.replace(`${window.location.origin}${baseUrl || ''}`, '');
}

function fireEvents(event: string, args: any) {}

class View extends Iris.Component {
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

      const route = getUrl(Router.baseUrl);

      instance.setState({
        route,
      });

      const component = Iris.components.find(item => item.key === route);

      if (component) {
        hook(component.instance, ON_ENTER);
      }
    };

    window.onpopstate = () => {
      const route = getUrl(Router.baseUrl);

      instance.setState({
        route,
      });

      const component = Iris.components.find(item => item.key === this.state.route);

      if (component) {
        hook(component.instance, ON_ENTER);
      }
    };
  }

  render(h: THyperscript) {
    return h(
      'div',
      null,
      h(
        (this as any).$router.routes.find((view: any) => view.path === this.state.route).component,
        { key: this.state.route }
      )
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
