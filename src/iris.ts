/**
 * Iris.js - a modern lightweight minimalist javascript
 *  framework for creating user interfaces.
 */
import VNode, { createElement } from './vdom/vnode';
import Component from './component';

class Iris {
  static Component = Component;
  static createElement = createElement;
  static vApp: VNode;
  
  static mount(vApp: VNode, selector: string) {
    const target = document.querySelector(selector);
    const $root = vApp.render();

    Iris.vApp = vApp;

    if (target) {
      target.replaceWith($root);
    }
  }
}

export default Iris;

window.Iris = Iris;
