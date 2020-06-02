import Iris from './iris';
import Component from './component';

export {};

declare global {
  interface Window {
    Iris: Iris;
  }

  interface IIterable<T> {
    [key: string]: T;
  }

  type TInstantiable<T> = new (arg?: any) => T;
}
