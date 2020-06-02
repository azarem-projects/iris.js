import { VNode } from "../vnode";

function isComponent(vNode: VNode) {
  return !!vNode.instance;
}

export { isComponent }
