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

  $render(h: THyperscript) {
    return h(
      'div',
      null,
      h(
        (this as any).$router.routes.find((view: any) => view.path === this.state.route).component, { key: this.state.route }
      )
    );
  }
}

export default View;
