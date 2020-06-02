import {
  isObject,
  isString,
  isInstantiable,
  isArray,
  isNotEmptyObj,
  arrForEach,
} from '../util/helpers';

import {
  addListener
} from './util/listeners';

import { NOKEY } from './diff/operations';

import Iris from '../iris';

import modifyRender from './render/modify-render';

import computeId from './render/compute-id';

import Component from '../component';

var components: any = [];

class VNode {
  tagName: string | TInstantiable<Component>;
  props: IIterable<any> | null;
  children: VNode[] | string[];

  parent?: VNode;

  key?: string;
  instance?: Component;
  count: number;

  constructor(tagName: string | TInstantiable<Component>, props: IIterable<any>, children: VNode[]) {
    const id = computeId(props);

    /**
     * If tagName is an instance of Component.
     */
    if (isInstantiable(tagName)) {
      const Constructor: TInstantiable<Component> = tagName as TInstantiable<Component>;

      if (!id) {
        this.instance = new Constructor(props);
      } else {
        const matchComponent = components.find(
          (_component: Component) => _component.id === id
        );

        if (matchComponent) {
          this.instance = matchComponent.instance as Component;
          this.instance.redefineProps(props);
        }

        if (!this.instance) {
          this.instance = new Constructor(props);

          components.push({
            instance: this.instance,
            id,
          });
        }
      }

      this.instance.render = modifyRender(this.instance.render, id);

      this.instance.lastRender = this.instance.render();
      this.instance.vNode = this;

      /**
       * Modifying properties if tagName is a Component.
       * tagName then becomes the wrapper of Component.render()
       * and children are its rendered children. 
       */
      tagName = this.instance.lastRender.tagName;
      children = this.instance.lastRender.children as VNode[];
    }

    this.tagName = tagName;
    this.props = isObject(props) ? props : {};
    this.children =
      children ||
      (!isNotEmptyObj(this.props) &&
        ((isString(props) && [props]) || (isArray(props) && props))) ||
      [];
    this.key = props ? props.key : void NOKEY;

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

    if (this.instance) {
      if (!this.parent) {
        this.parent = Iris.vApp;
      }

      var vChildComponents: Component[] = [];

      const iterateChilrenOf = (iteration: any) => {
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

      iterateChilrenOf(this);

      for (var i = 0; i < vChildComponents.length; i++) {
        vChildComponents[i].parent = this;
      }
    }
  }

  render(): Element {
    const $root = document.createElement(this.tagName as string);

    if (this.instance) {
      this.instance.$root = $root;

      if (!this.parent && Iris.vApp) {
        this.parent = Iris.vApp;
      }
    } else {
      for (const [key, value] of Object.entries(this.props || {})) {
        if (key.startsWith('on')) {
          addListener($root, key.replace('on', '').toLocaleLowerCase(), value);
        } else {
          $root.setAttribute(key, value);
        }
      }
    }

    arrForEach(this.children, (child: VNode | string) => {
      const childDom =
        child instanceof VNode
          ? child.render()
          : document.createTextNode(child);
      $root.appendChild(childDom);
    });

    return $root;
  }
}

function createElement(tagName: string | TInstantiable<Component>, props: IIterable<any>, ...children: VNode[]): VNode {
  const hasChildren = children.length > 0;
  const rawChildren = hasChildren ? [].concat(...children as any) : [];

  return new VNode(tagName, props, rawChildren);
}

export default VNode

export { createElement };
