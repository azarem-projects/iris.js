import getUrl from './util/get-url';
import Router from '.';

const ON_ENTER = 'onEnter';
const ON_LEAVE = 'onLeave';

function handleNavigation(this: Component) {
  const instance = this;

  const leavingComponent = Iris.components.find(
    (item) => item.key === (instance.state as IIterable<any>).route
  );

  if (leavingComponent) {
    Iris.hook(leavingComponent.instance, ON_LEAVE);
  }

  const route = getUrl(Router.baseUrl);

  instance.setState({
    route,
  });

  const enteringComponent = Iris.components.find((item) => item.key === route);

  if (enteringComponent) {
    Iris.hook(enteringComponent.instance, ON_ENTER);
  }
}

export default handleNavigation;
