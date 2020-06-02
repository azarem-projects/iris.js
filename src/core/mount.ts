import VNode from '@/vdom/vnode';
import Iris from '@/core/iris';

export default function mount(vApp: VNode, selector: string) {
  Iris.vApp = vApp;

  const target = document.querySelector(selector);
  const $root = vApp.render();

  if (target) {
    target.replaceWith($root);
  }

  return vApp;
}
