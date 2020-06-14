import getProto from '@/util/get-proto';
import VNode from '@/vdom/vnode';

import diff from '@/vdom/diff/diff';
import patch from '@/vdom/patch';
import Iris from './iris';

/**
 * Iris.Component
 *
 * The core of Iris.
 */
class Component {
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

  constructor(props: IIterable<any>) {
    this.props = props;
  }

  /**
   * Hyperscript.
   */
  render(h?: THyperscript): VNode | void {};

  /**
   * Hooks.
   */
  onInit() {}

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
    const updated = this.render(Iris.createElement as THyperscript) as VNode;    
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
  extendScope(item: IIterable<any>) {
    for (const [key, value] of Object.entries(item)) {
      (this as IIterable<any>)[key] = value;
    }
  }

  /**
   * Sends a message to the parent.
   */
  dispatch(event: string, message: IIterable<any> | any) {    
    if (!this.parent) { return; }

    const callback = getProto(this.parent)[event];

    if (!callback) { return; }

    callback.call(this.parent, message);
  }

  reset() {
    this.$onInitFired = false;
  }
}

export default Component;
