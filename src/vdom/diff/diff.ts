import { isString, objForEach, arrForEach, isNotEmptyObj } from '@/util/helpers';
import { REPLACE, REORDER, PROPS, TEXT } from '@/vdom/diff/operations';
import listDiff from '@/vdom/diff/list-diff';
import { isComponent } from '@/vdom/util/helpers';
import VNode from '@/vdom/vnode';

function diff(oTree: VNode, nTree: VNode) {
  let index = 0;

  const patches = {};
  dfsWalk(oTree, nTree, index, patches);

  return patches;
}

function dfsWalk(oNode: VNode, nNode: VNode, index: number, patches: any) {
  const currentPatch: any[] = [];

  if (nNode === null) return;

  if (isString(oNode) && isString(nNode)) {
    oNode !== nNode &&
      currentPatch.push({
        type: TEXT,
        content: nNode,
      });
  } else if (oNode.tagName === nNode.tagName && oNode.key === nNode.key) {
    if (isNotEmptyObj(oNode.props) || isNotEmptyObj(nNode.props)) {
      const propsPatches = diffProps(oNode, nNode);

      /**
       * Blocks properties for the vnodes,
       * which have instances => are components.
       * Needs to be changed later.
       */
      if (!isComponent(oNode)) {
        if (propsPatches) {
          currentPatch.push({
            type: PROPS,
            props: propsPatches,
          });
        }
      }
    }
    if (!(!isNotEmptyObj(nNode.props) && (nNode.props || {}).hasOwnProperty('ignore'))) {
      (oNode.children.length || nNode.children.length) && diffChildren(oNode.children as VNode[], nNode.children as VNode[], index, patches, currentPatch);
    }
  } else {
    currentPatch.push({ type: REPLACE, node: nNode });
  }

  currentPatch.length && (patches[index] = currentPatch);
}

function diffChildren(oChildren: VNode[], nChildren: VNode[], index: number, patches: any, currentPatch: any) {

  /**
   * If a text node becomes empty we want to prevent it from being removed.
   */
  for (var i = 0; i < oChildren.length; i++) {
    if (isString(oChildren[i])) {
      if (!nChildren[i]) {
        nChildren[i] = ' ' as any;
      }
    }
  }

  const diffs = listDiff(oChildren, nChildren, 'key');

  nChildren = diffs.children;

  diffs.moves.length && currentPatch.push({ type: REORDER, moves: diffs.moves });

  let leftNode: any = null;
  let currentNodeIndex = index;
  arrForEach(oChildren, (_item: VNode, _index: any) => {
    const nChild: VNode = nChildren[_index];

    currentNodeIndex = leftNode && leftNode.count ? currentNodeIndex + leftNode.count + 1 : currentNodeIndex + 1;
    _item !== nChild && dfsWalk(_item, nChild, currentNodeIndex, patches);
    leftNode = _item;
  });
}

function diffProps(oNode: VNode, nNode: VNode) {
  let isChange = false;
  const oProps: IIterable<any> = oNode.props || {};
  const nProps: IIterable<any> = nNode.props || {};

  const propsPatched: IIterable<any> = {};

  objForEach(oProps, (key: string) => {
    if (nProps[key] !== oProps[key] || !oProps.hasOwnProperty(key)) {
      !isChange && (isChange = true);
      propsPatched[key] = nProps[key];
    }
  });

  return !isChange ? null : propsPatched;
}

export default diff;
