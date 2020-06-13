import Iris from './core/iris';
import Component from './core/component';

import StateManager from './plugins/examples/state-manager';
import Ajax from './plugins/examples/ajax';
import Router from './plugins/examples/router';
import VNode from './vdom/vnode';

export {};

declare global {
  interface Window {
    Iris: Iris;
    StateManager: typeof StateManager;
    Ajax: typeof Ajax;
    Router: typeof Router;
  }

  interface IIterable<T> {
    [key: string]: T;
  }

  type TInstantiable<T> = new (arg?: any) => T;
  
  type THyperscript = (tagName: string | TInstantiable<Component>, props?: IIterable<any> | null | {}, ...children: (VNode | string)[]) => VNode;
}
