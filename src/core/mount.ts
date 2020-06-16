import VNode from '@/vdom/vnode';
import Iris from '@/core/iris';
import { isString } from '@/util/helpers';
import { error } from '@/debug';
import { ON_INIT } from '@/util/hooks';

function mount(vApp: VNode, target: string | Element) {
  if (typeof vApp === 'function') {
    vApp = Iris.createElement(vApp, null);
  }

  const element = <Element> (isString(target) ? document.querySelector(target as string) : target);

  Iris.vApp = vApp;

  const $root = vApp.render();  
  
  if (element) {
    element.replaceWith($root);
  } else {
    error('Target element not found. Provided target:', target);
  }
  
  if (vApp.component) {
    vApp.component.$onInitFired = true;
    
    Iris.hook(vApp.component, ON_INIT);
  }

  return vApp;
}

export default mount;
