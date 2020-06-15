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

import { ON_INIT, BEFORE_RENDER } from '@/util/hooks';

import extractKeyIdPair from './util/ids-keys';
import getPrototype from '@/util/get-prototype';
import extend from './util/extend';
import stringToHyperscript from '@/parse/string-to-hyperscript';

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
      const Constructor: TInstantiable<Component> = tagName as TInstantiable<Component>;

      /**
       * Extending the component's prototype,
       * considering, that it's not inheriting from Iris.Component.
       */
      extend(Constructor, Component as TInstantiable<Component>);

      /**
       * key - is given by the user.
       * _id - is set programmatically.
       */
      const { _id, key, parent } = extractKeyIdPair(props);

      /**
       * Attempt to find an existing instance of the component by its key and _id.
       */
      if (!_id) {
        this.component = new Constructor();
      } else {
        const matchComponent = Iris.components.find(
          (component) =>
            component.key === key && component.id === _id
        );

        if (matchComponent) {
          this.component = matchComponent.instance as Component;
        } else {
          this.component = new Constructor();

          Iris.components.push({
            instance: this.component,
            id: _id,
            key: key,
            parent,
          });
        }
      }

      this.component.setProps(props);

      this.component.extendScope(Iris.toInject);

      if (!getPrototype<Component>(Constructor).$render) {
        const renderResult = this.component.render.apply(this.component, <[]>(
          (<any>[Iris.createElement])
        ));

        if (isString(renderResult)) {
          getPrototype<Component>(Constructor).$render = stringToHyperscript(
            renderResult as string,
            this.component
          )();
        } else {
          getPrototype<Component>(Constructor).$render = this.component.render as (
            h?: THyperscript
          ) => VNode;
        }
      }

      /**
       * Modifying the render function provided by the user.
       * Each component declaration gets a specific computed id
       * based on its path and eventually key.
       */
      if (!getPrototype<Component>(Constructor).$render.toString().includes('___mod')) {
        getPrototype<Component>(Constructor).$render = modifyRender(
          this.component.$render,
          _id,
          key,
          {
            __id: _id,
            _key: key,
          }
        );
      }

      this.component.lastRender = this.component.$render.apply(this.component, <[]>(
        (<any>[Iris.createElement])
      )) as VNode;

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
    var $root = document.createElement(this.tagName as string);

    if (this.isComponent()) {
      /**
       * There's only one case if component doesn't have a parent.
       * If it's an app itself.
       */
      if (!(this.component as Component).parent) {
        if (this.props) {
          const { parent } = this.props;

          if (parent) {
            const match = Iris.components.find(
              (component) => component.id === parent._id && component.key === parent.key
            );

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

    if (this.isComponent()) {
      if ((this.component as Component).lastRender) {
        for (const [attribute, value] of Object.entries(((this.component as Component).lastRender as VNode).props as IIterable<any>)) {
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
        if (child.isComponent()) {
          Iris.hook(child.component as any, BEFORE_RENDER, { arguments: [childDom] });
        }
      }

      $root.appendChild(childDom);
    });

    if (this.isComponent()) {
      if (!(this.component as any).$onInitFired) {
        Iris.hook(this.component as any, ON_INIT);

        (this.component as any).$onInitFired = true;
      }

      (this.component as any).$root = $root;
    }

    return $root;
  }

  isComponent() {
    return Boolean(this.component);
  }
}

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

export default VNode;

export { createElement };
