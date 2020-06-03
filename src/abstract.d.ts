import Iris from './core/iris';
import Component from './core/component';
import StateManager from './plugins/examples/state-manager';

export {};

declare global {
  interface Window {
    Iris: Iris;
    StateManager: typeof StateManager;
  }

  interface IIterable<T> {
    [key: string]: T;
  }

  type TInstantiable<T> = new (arg?: any) => T;
}
