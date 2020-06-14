import Iris from './core/iris';

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

  class Component {
    id?: string;
    props?: IIterable<any> | undefined | null;
    state?: IIterable<any>;
  
    lastRender?: VNode;
    $root?: Element;
  
    vNode?: VNode;
    parent?: Component;
  
    $onInitFired: boolean;    

    constructor(props: IIterable<any>);    
    
    render(h?: THyperscript): VNode | void;
    onInit(): void;
    setState(newState: IIterable<any>): void;
    forceUpdate(): void;
    setProps(props: IIterable<any> | undefined | null): void;
    extendScope(item: IIterable<any>): void;
    dispatch(event: string, message: IIterable<any> | any): void;
  }

  type TInstantiable<T> = new (arg?: any) => T;
  
  type THyperscript = (tagName: string | TInstantiable<Component>, props?: IIterable<any> | null | {}, ...children: (VNode | string)[]) => VNode;
}
