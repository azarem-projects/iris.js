import Component from '@/core/component';
import getProto from './get-proto';

function hook(component: Component, hook: string) {
  const proto = getProto(component);

  if (!proto) { return; }

  const event = proto[hook];

  if (!event) { return; }

  event.call(component);
}

export default hook;
