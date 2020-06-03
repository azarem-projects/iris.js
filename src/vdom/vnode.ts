import { isObject, isString, isInstantiable, isArray, isNotEmptyObj, arrForEach } from '@/util/helpers';

import { addListener } from '@/vdom/util/listeners';

import { NOKEY } from '@/vdom/diff/operations';

import Iris from '@/core/iris';

import modifyRender from '@/vdom/render/modify-render';

import computeId from '@/vdom/render/compute-id';

import Component from '@/core/component';
import hook from '@/util/hooks';

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
  count: number;

  /**
   * VNodes can represent both components
   * and default html elements.
   * That's why we need to detect whether it needs
   * a component instance attached to it or not.
   */
  constructor(tagName: string | TInstantiable<Component>, props: IIterable<any>, children: VNode[]) {
    const id = computeId(props);

    /**
     * If tagName is an instance of Component.
     */
    if (isInstantiable(tagName)) {
      const Constructor: TInstantiable<Component> = tagName as TInstantiable<Component>;

      if (!id) {
        this.component = new Constructor(props);
        hook(this.component, 'onInit');
      } else {
        const matchComponent = Iris.components.find(id);

        if (matchComponent) {
          this.component = matchComponent.instance as Component;
          this.component.updateProps(props);
        }

        if (!this.component) {
          this.component = new Constructor(props);

          /**
           * This may cause some errors.
           * => needs to be overthought.
           */
          hook(this.component, 'onInit');

          Iris.components.push({
            instance: this.component,
            id,
          });
        }
      }

      /**
       * Modifying the render function provided by the user.
       * Each component declaration gets a specific computed id
       * based on its path and eventually key.
       */
      this.component.render = modifyRender(this.component.render, id);

      this.component.lastRender = this.component.render();
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

    this.children = children || (!isNotEmptyObj(this.props) && ((isString(props) && [props]) || (isArray(props) && props))) || [];

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

    /**
     * The component is ready to be rendered.
     */
    if (this.component) {
      this.component.$prepared = true;
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

    } else {
      /**
       * If an attribute starts with 'on', it's an event.
       */
      for (const [key, value] of Object.entries(this.props as IIterable<any>)) {
        if (key.startsWith('on')) {
          addListener($root, key.replace('on', '').toLocaleLowerCase(), value);
        } else {
          $root.setAttribute(key, value);
        }
      }
    }

    /**
     * Rendering and appending the children.
     */
    arrForEach(this.children, (child: VNode | string) => {
      const childDom = child instanceof VNode ? child.render() : document.createTextNode(child);
      $root.appendChild(childDom);
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
function createElement(tagName: string | TInstantiable<Component>, props: IIterable<any>, ...children: VNode[]): VNode {
  const hasChildren = children.length > 0;
  const rawChildren = hasChildren ? [].concat(...(children as any)) : [];

  return new VNode(tagName, props, rawChildren);
}

export default VNode;

export { createElement };
