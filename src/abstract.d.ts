import StateManager from '@/plugins/examples/state-manager';
import Ajax from '@/plugins/examples/ajax';
import Router from '@/plugins/examples/router';
import VNode from '@/vdom/vnode';

declare namespace Components {
  interface IComponent {
    instance: Component;
    id: string;
    key: string;
  }
}

declare namespace FunctionCache {  
  interface IVariation {
    args: any[];
    result: any;
  }

  interface ICached {
    key: string | number;
    variations: IVariation[];
  }
}

declare namespace Iris {
}

declare global {

  class Components {    
    private items: Components.IComponent[];

    constructor();

    push(component: Components.IComponent): void;
    find(predicate: (value: Components.IComponent, index: number, obj: Components.IComponent[]) => unknown): Components.IComponent | undefined;
    remove(predicate: (value: Components.IComponent, index: number, obj: Components.IComponent[]) => unknown): void;
    getUnique(id: string | number): Component | undefined;
  }

  class FunctionCache {    
    items: FunctionCache.ICached[];

    constructor();

    put(key: string | number, args: any[], result: any): void;

    find(key: string | number, args: any[]): FunctionCache.IVariation | undefined;
  }
  
  interface IHookOptions {
    arguments: any[];
  }

  class Iris {
    static cache: FunctionCache;
    static components: Components;
    static Component: typeof Component;
    static Plugin: typeof Plugin;
    static install: (plugin: Plugin) => void;
    static toInject: IIterable<any>;

    static createElement: ((
      tagName: string | TInstantiable<Component>,
      props?: IIterable<any> | null | {},
      children?: any
    ) => VNode) | THyperscript;
    
    static vApp: VNode;
    static mount: (vApp: VNode, target: string | Element) => VNode;
    static Empty: typeof Component;
    static hook: (component: Component, hook: string, options?: IHookOptions) => void;
  }

  interface IChildEvent {
    childEvent: string;
    parentEvent: string;
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

    childEvents: any[];

    components?: (typeof Component)[];

    constructor(props: IIterable<any>);    
    
    $render(h?: THyperscript): VNode | void;
    render(h?: THyperscript): VNode | string | void;
    onInit(): void;
    setState(newState: IIterable<any>): void;
    forceUpdate(): void;
    setProps(props: IIterable<any> | undefined | null): void;
    extendScope(item: IIterable<any>): void;
    dispatch(event: string, message: IIterable<any> | any): void;
  }

  interface Window {
    [x: string]: any;
    
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

export {};
