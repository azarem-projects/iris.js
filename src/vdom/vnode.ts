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

import Component from '@/core/component';
import hook, { ON_INIT, BEFORE_RENDER } from '@/util/hooks';
import extractKeyIdPair from './util/ids-keys';
import getProto from '@/util/get-proto';
import getPrototype from '@/util/get-prototype';

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
    props?: IIterable<any> | null | {},
    children?: VNode[]
  ) {
    /**
     * To identify components and their instances
     * I used unique ids which get attached by modifying
     * the user-defined render() functions.
     *
     * It's stored as _id to prevent Iris from recognizing it
     * as the valid HTML id-attribute.
     */

    /**
     * If tagName is an instance of Component.
     */
    if (isInstantiable(tagName)) {
      /**
       * key - is given by the user.
       * _id - is set programmatically.
       */
      const { _id, key } = extractKeyIdPair(props);
      
      const Constructor: TInstantiable<Component> = tagName as TInstantiable<Component>;

      if (!_id) {
        this.component = new Constructor(props);
      } else {        
        const matchComponent = Iris.components.find(component => component.key === key && component.id === _id);

        if (matchComponent) {
          this.component = matchComponent.instance as Component;
          this.component.updateProps(props);
        } else {
          this.component = new Constructor(props);

          Iris.components.push({
            instance: this.component,
            id: _id,
            key: key
          });
        }
      }

      this.component.extendScope(Iris.toInject);

      /**
       * Modifying the render function provided by the user.
       * Each component declaration gets a specific computed id
       * based on its path and eventually key.
       */

      /**
       * Let's try to cache it!
       * 
       * Cache works pretty well, but not for this function.
       * It's just not about caching => needs to be redone.
       */
      if (!getPrototype(tagName).render.toString().includes('___mod')) {
        getPrototype(tagName).render = modifyRender(this.component.render, _id, key, { __id: _id, _key: key });
      }

      this.component.lastRender = this.component.render.apply(
        this.component,
        <[]> <any> [Iris.createElement]
      );

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
    this.props = isObject(props as IIterable<any>) ? (props as IIterable<any>) : {};

    this.children =
      (children as []) ||
      (!isNotEmptyObj(this.props) && ((isString(props) && [props]) || (isArray(props) && props))) ||
      [];

    this.key = this.props ? this.props.key : void NOKEY;

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
  }

  /**
   * vNode2Element
   */
  render(): Element {
    /**
     * We know that tagName is now a string, but typescript doesn't.
     */
    const $root = document.createElement(this.tagName as string);

    if (this.isComponent()) {
      (this.component as Component).$root = $root;
      /**
       * There's only one case if component doesn't have a parent.
       * If it's an app itself.
       */
      if (!(this.component as Component).parent) {
        if (this.props) {
          const { parent } = this.props;

          if (parent) {
            const match = Iris.components.find(component => component.id === parent._id && component.key === parent.key);

            if (match) {
              (this.component as Component).parent = match.instance;
            }
          }
        }

        if (!(this.component as any).parent && Iris.vApp.component) {
          (this.component as Component).parent = Iris.vApp.component;
        }
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
          $root.setAttribute(attribute !== 'className' ? attribute : 'class', value);
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

          child.component.$prepared = true;
          child.component.$onInitFired = true;
        }
      }
    });

    if (this.component) {
      this.component.$prepared = true;
      this.component.$onInitFired = true;
    }

    return $root;
  }

  isComponent() {
    return !!this.component;
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
  props?: IIterable<any> | null | {},
  ...children: VNode[]
): VNode {
  const hasChildren = (children || []).length > 0;
  const rawChildren = hasChildren ? [].concat(...(children as any)) : [];

  return new VNode(tagName, props, rawChildren);
}

export default VNode;

export { createElement };
