import getProto from '@/util/get-proto';
import VNode from '@/vdom/vnode';

import diff from '@/vdom/diff/diff';
import patch from '@/vdom/patch';

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
  props?: IIterable<any>;
  state?: IIterable<any>;

  lastRender?: VNode;
  $root?: Element;

  vNode?: VNode;
  parent?: VNode;

  $prepared: boolean = false;
  $onInitFired: boolean = false;

  /**
   * Hyperscript.
   */
  abstract render(): VNode;

  /**
   * Hooks.
   */
  abstract onInit(): void;

  constructor(props: IIterable<any>) {
    this.props = props;
  }

  /**
   * Updates the states, re-renders the component.
   */
  setState(newState: IIterable<any>) {
    this.state = Object.assign(this.state, newState);

    if (this.$prepared && this.$onInitFired) {
      this.forceUpdate();
    }
  }

  /**
   * Force update as soon as the state gets updated.
   */
  forceUpdate() {
    const updated = this.render();
    const patches = diff(this.lastRender as VNode, updated);

    this.lastRender = updated;

    patch(this.$root, patches);
  }

  /**
   * Updating props every time the component
   * needs to be re-rendered.
   */
  updateProps(props: IIterable<any>) {
    this.props = props;
  }

  /**
   * Extending "this"-scope of the component.
   * 
   * @param item 
   */
  extendScope(item: IIterable<any>) {
    for (const [key, value] of Object.entries(item)) {
      (this as IIterable<any>)[key] = value;
    }
  }

  /**
   * Sends a message to the parent.
   * 
   * @param event function name
   * @param message js-object
   */
  dispatch(event: string, message: IIterable<any> | any) {
    if (!this.vNode || !this.vNode.parent) { return; }

    const parent = this.vNode.parent.component;

    if (!parent) { return; }

    const callback = getProto(parent)[event];

    if (!callback) { return; }

    callback.call(parent, message);
  }
}

export default Component;
