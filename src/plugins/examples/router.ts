import Iris from '@/core/iris';
import Component from '@/core/component';

interface IRoute {

}

interface IView {
  name?: string;
  path: string;
  component: typeof Component;
}

class View extends Iris.Component {
  $router: any;

  onInit() {
    console.log(this.$router);
  }

  render(h: THyperscript) {
    return h('div', null,
      h(this.$router.views[0].component, null)
    );
  }
}

class Router extends Iris.Plugin {
  views: IView[];

  constructor(views: IView[]) {
    super();

    this.views = views;
  }

  go(route: IRoute) {
    
  }

  inject() {
    return {
      $router: {
        go: this.go,
        views: this.views,
        View
      }
    }
  }
}

export default Router;
