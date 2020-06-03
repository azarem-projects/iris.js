import {
  isObject,
  isString,
  isInstantiable,
  isArray,
  isNotEmptyObj,
  arrForEach,
} from '@/util/helpers';

import { addListener } from '@/vdom/util/listeners';

import { NOKEY } from '@/vdom/diff/operations';

import Iris from '@/core/iris';

import modifyRender from '@/vdom/render/modify-render';

import computeId from '@/vdom/render/compute-id';

import Component from '@/core/component';
import hook, { ON_INIT, BEFORE_RENDER } from '@/util/hooks';

/**
 * Virtual Node a.k.a Virtual Tree
 *
 * The core of Iris.
 */
class VNode {
  tagName: string | TInstantiable<Component>;
  props: IIterable<any> | null;
  children: VNode[] | string[];

  parent?: VNode;

  key?: string;
  component?: Component;
  scope?: IIterable<any>;
  count: number;

  /**
   * VNodes can represent both components
   * and default html elements.
   * That's why we need to detect whether it needs
   * a component instance attached to it or not.
   */
  constructor(
    tagName: string | TInstantiable<Component>,
    props: IIterable<any>,
    children: VNode[]
  ) {
    /**
     * To identify components and their instances
     * I used unique ids which get attached by modifying
     * the user-defined render() functions.
     *
     * It's stored as _id to prevent Iris from recognizing it
     * as a valid HTML attribute.
     */
    const _id = computeId(props);

    /**
     * If tagName is an instance of Component.
     */
    if (isInstantiable(tagName)) {
      const Constructor: TInstantiable<Component> = tagName as TInstantiable<Component>;

      if (!_id) {
        this.component = new Constructor(props);
      } else {        
        const matchComponent = Iris.components.find(component => component.id === _id);

        if (matchComponent) {
          this.component = matchComponent.instance as Component;
          this.component.updateProps(props);
        } else {
          this.component = new Constructor(props);

          Iris.components.push({
            instance: this.component,
            id: _id,
          });
        }
      }

      // console.log(Iris.components);

      this.component.extendScope(Iris.toInject);

      /**
       * Modifying the render function provided by the user.
       * Each component declaration gets a specific computed id
       * based on its path and eventually key.
       */

      this.component.render = modifyRender(this.component.render, _id);

      this.component.lastRender = this.component.render.apply(this.component);

      this.component.vNode = this;

      /**
       * Modifying properties if tagName is a Component.
       * tagName then becomes the wrapper of Component.render()
       * and children are its rendered children.
       */
      tagName = this.component.lastRender.tagName;
      children = this.component.lastRender.children as VNode[];
    }

    this.tagName = tagName;
    this.props = isObject(props) ? props : {};

    this.children =
      children ||
      (!isNotEmptyObj(this.props) && ((isString(props) && [props]) || (isArray(props) && props))) ||
      [];

    this.key = props ? props.key : void NOKEY;

    /**
     * Counting children to be able
     * to identify them whithin a vnode.
     */
    var count = 0;

    arrForEach(this.children, (item: VNode, index: number) => {
      if (item instanceof VNode) {
        count += item.count;
      } else {
        this.children[index] = '' + item;
      }
      count++;
    });

    this.count = count;

    if (this.component) {
      if (!this.parent) {
        this.parent = Iris.vApp;
      }

      /**
       * So-called chain of child-components.
       * Serves to find child-parent relations.
       */
      var vChildComponents: Component[] = [];

      /**
       * Iterates through all the children and nested children of ELEMENTS
       * skiping the children of the components.
       */
      const iterateChilrenOf = (iteration: any) => {
        if (!iteration.children) {
          return;
        }

        for (var i = 0; i < iteration.children.length; i++) {
          if (iteration.children[i].instance) {
            vChildComponents.push(iteration.children[i]);
          } else {
            if (isString(iteration.children[i])) {
              iterateChilrenOf(iteration.children[i]);
            }
          }
        }
      };

      /**
       * Start iteration.
       */
      iterateChilrenOf(this);

      /**
       * All matches are the children of this vNode.
       */
      for (var i = 0; i < vChildComponents.length; i++) {
        vChildComponents[i].parent = this;
      }
    }
  }

  /**
   * vNode2Element
   */
  render(): Element {
    /**
     * We know that tagName is now a string, but typescript doesn't.
     */
    const $root = document.createElement(this.tagName as string);

    if (this.component) {
      this.component.$root = $root;

      /**
       * There's only one case if component doesn't have a parent.
       * If it's an app itself.
       */
      if (!this.parent && Iris.vApp) {
        this.parent = Iris.vApp;
      }
    }

    /**
     * If an attribute starts with 'on', it's an event.
     */
    for (const [attribute, value] of Object.entries(this.props as IIterable<any>)) {
      if (attribute.startsWith('on')) {
        addListener($root, attribute.replace('on', '').toLocaleLowerCase(), value);
      } else {
        /**
         * Checking if it's a valid HTML attribute.
         */
        const exists = attribute in $root;

        if (exists) {
          $root.setAttribute(attribute, value);
        }
      }
    }

    /**
     * Rendering and appending the children.
     */
    arrForEach(this.children, (child: VNode | string) => {
      const childDom = child instanceof VNode ? child.render() : document.createTextNode(child);

      if (child instanceof VNode) {
        if (child.component) {
          hook(child.component, BEFORE_RENDER, { arguments: [childDom] });
        }
      }

      $root.appendChild(childDom);

      /**
       * After a child gets rendered
       * for the first time the parent
       * calls its onInit hook.
       */
      if (child instanceof VNode) {
        if (child.component && !child.component.$onInitFired) {
          hook(child.component, ON_INIT);
        }
      }
    });

    return $root;
  }
}

/**
 * Hyperscript.
 * @param tagName string | Component
 * @param props - { key: value }
 * @param children [string | Component]
 */
function createElement(
  tagName: string | TInstantiable<Component>,
  props: IIterable<any>,
  ...children: VNode[]
): VNode {
  const hasChildren = children.length > 0;
  const rawChildren = hasChildren ? [].concat(...(children as any)) : [];

  return new VNode(tagName, props, rawChildren);
}

export default VNode;

export { createElement };
