import VNode from '@/vdom/vnode';
import Iris from '@/core/iris';
import { isString } from '@/util/helpers';
import { error } from '@/debug';
import hook from '@/util/hooks';

export default function mount(vApp: VNode, target: string | Element) {
  const element = <Element> (isString(target) ? document.querySelector(target as string) : target);

  Iris.vApp = vApp;

  const $root = vApp.render();  
  
  if (element) {
    element.replaceWith($root);
  } else {
    error('Target element not found. Provided target:', target);
  }
  
  if (vApp.component) {
    vApp.component.$prepared = true;
    vApp.component.$onInitFired = true;
    
    hook(vApp.component, 'onInit');
  }

  return vApp;
}
