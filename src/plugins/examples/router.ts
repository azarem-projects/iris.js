import Iris from '@/core/iris';
import Component from '@/core/component';

interface IRoute {}

interface IView {
  name?: string;
  path: string;
  component: typeof Component;
}

function getUrl() {
  return window.location.href.replace(`${window.location.origin}/example`, '');
}

class View extends Iris.Component {
  id = 'router.view';

  $router: any;

  state = {
    route: getUrl(),
  };

  onInit() {}

  render(h: THyperscript) {
    return h(
      'div',
      null,
      h(this.$router.views.find((view: any) => view.path === this.state.route).component, { key: this.state.route })
    );
  }
}

class Router extends Iris.Plugin {
  views: IView[];

  constructor(views: IView[]) {
    super();

    this.views = views;
  }

  go(url: string) {
    window.history.pushState('', '', url);

    const view = Iris.components.getUnique('router.view');

    view?.setState({
      route: url.replace('/example', '')
    });
  }

  inject() {
    return {
      $router: {
        go: this.go,
        views: this.views,
        View,
      },
    };
  }
}

export default Router;
