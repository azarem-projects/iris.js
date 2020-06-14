import Component from '@/core/component';
import getProto from '@/util/get-proto';

interface IHookOptions {
  arguments: any[];
}

function hook(component: Component, hook: string, options?: IHookOptions) {
  const proto = getProto(component);

  if (!proto) { return; }

  const event = proto[hook];

  if (!event) { return; }
  
  (event as (...args: []) => void).apply(component, options?.arguments as [] || []);

  (component as IIterable<any>)[`$${hook}Fired`] = true;
}

const ON_INIT = 'onInit';
const ON_ENTER = 'onEnter';
const BEFORE_RENDER = 'beforeRender';

export { ON_INIT, ON_ENTER, BEFORE_RENDER };

export default hook;
