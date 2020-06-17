import getProto from '@/util/get-proto';
import VNode from '@/vdom/vnode';

import diff from '@/vdom/diff/diff';
import patch from '@/vdom/patch';
import Iris from '@/core/iris';

/**
 * Iris.Component
 *
 * The core of Iris.
 */
abstract class Component {
  /**
   * We don't trust the user.
   * Everything might be undefined.
   */
  id?: string;
  props?: IIterable<any> | undefined | null;
  state?: IIterable<any>;

  lastRender?: VNode;
  $root?: Element;

  vNode?: VNode;
  parent?: Component;

  $onInitFired: boolean = false;

  childEvents: IChildEvent[] = [];

  /**
   * Hyperscript.
   */
  abstract $render(h?: THyperscript): VNode | void;
  abstract render(h?: THyperscript): VNode | string | void;

  /**
   * Hooks.
   */
  onInit() {}

  init() {
    this.childEvents = [];
  }

  /**
   * Updates the states, re-renders the component.
   */
  setState(newState: IIterable<any>) {
    this.state = Object.assign(this.state, newState);

    if (this.$onInitFired) {
      this.forceUpdate();
    }
  }

  /**
   * Force update as soon as the state gets updated.
   */
  forceUpdate() {
    const updated = this.$render(Iris.createElement as THyperscript) as VNode;    
    const patches = diff(this.lastRender as VNode, updated);

    this.lastRender = updated;

    patch(this.$root, patches);
  }

  /**
   * Updating props every time the component
   * needs to be re-rendered.
   */
  setProps(props: IIterable<any> | undefined | null) {
    this.props = props;
  }

  /**
   * Extending "this"-scope of the component.
   */
  extendScope(this: IIterable<any>, item: IIterable<any>) {
    for (const [key, value] of Object.entries(item)) {
      this[key] = value;
    }
  }

  /**
   * Sends a message to the parent.
   */
  dispatch(event: string, message: IIterable<any> | any) {        
    if (!this.parent) { return; }

    const callbackName = this.parent.childEvents.find(item => item.childEvent === event)?.parentEvent;
    
    if (!callbackName) { return; }

    if (callbackName.startsWith('set-')) {
      const variable = callbackName.replace('set-', '');

      this.parent.setState({ [variable]: message });
    } else {
      const callback = getProto(this.parent)[callbackName];
  
      if (!callback) { return; }
  
      callback.call(this.parent, message);
    }
  }
}

export default Component;
