/**
 * Iris.js - a modern lightweight minimalist javascript
 *  framework for creating user interfaces.
 */
import VNode, { createElement } from '@/vdom/vnode';
import Component from '@/core/component';
import Components from '@/static/components';
import mount from '@/core/mount';

/**
 * The core of Iris.
 */
class Iris {
  /**
   * The storage of instantiated components.
   */
  static components: Components;

  /**
   * Component class for inheritance
   * @example class App extends Iris.Component {
   * }
   */
  static Component: typeof Component;

  /**
   * The accessor to hyperscript.
   */
  static createElement: (
    tagName: string | TInstantiable<Component>,
    props: IIterable<any>,
    children: any
  ) => VNode;

  /**
   * The virtual app.
   * Later needs to be extended to an array.
   */
  static vApp: VNode;

  /**
   * Mount the application.
   */
  static mount: (vApp: VNode, selector: string) => VNode;
}

Iris.components = new Components();
Iris.Component = Component;
Iris.createElement = createElement;
Iris.mount = mount;

export default Iris;
