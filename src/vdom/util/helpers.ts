import VNode from '@/vdom/vnode';

function isComponent(vNode: VNode) {
  return !!vNode.component;
}

export { isComponent };
