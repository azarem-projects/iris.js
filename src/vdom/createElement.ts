import VNode from "./vnode";

/**
 * Hyperscript.
 */
function createElement(
  tagName: string | TInstantiable<Component>,
  props?: IIterable<any> | null | {},
  ...children: VNode[]
): VNode {
  const hasChildren = (children || []).length > 0;
  const rawChildren = hasChildren ? [].concat(...(children as any)) : [];

  return new VNode(tagName, props, rawChildren);
}

export default createElement;
