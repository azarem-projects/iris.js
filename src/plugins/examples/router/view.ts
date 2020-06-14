import getUrl from './util/get-url';
import Router from '.';
import handleNavigation from './handleNavigation';

class View {
  id = 'router.view';

  state = {
    route: getUrl(Router.baseUrl),
  };

  onInit() {
    const instance: Component = <any>this;

    const pushState = history.pushState;

    history.pushState = function () {
      pushState.apply(history, arguments as any);

      handleNavigation.call(instance);
    };

    window.onpopstate = function () {
      handleNavigation.call(instance);
    };
  }

  render(h: THyperscript) {
    const Component =
      (this as any).$router.routes.find((view: any) => view.path === this.state.route)?.component ||
      Iris.Empty;

    return h(
      'div',
      null,
      h(Component, { key: this.state.route, _id: 'Property of the Iris.Router' })
    );
  }
}

export default View;
