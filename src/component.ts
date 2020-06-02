import diff from '@/vdom/diff/diff';
import patch from '@/vdom/patch';
import getProto from '@/util/get-proto';
import VNode from '@/vdom/vnode';

abstract class Component {
  id?: string;
  props?: IIterable<any>;
  state?: IIterable<any>;

  lastRender?: VNode;
  $root?: Element;

  vNode?: VNode;
  parent?: VNode;

  abstract render(): VNode;  

  constructor(props: IIterable<any>) {
    this.props = props;
  }

  setState(newState: IIterable<any>) {
    this.state = Object.assign(this.state, newState);
    this.forceUpdate();
  }
  
  forceUpdate() {
    const updated = this.render();
    const patches = diff(this.lastRender as VNode, updated);
  
    this.lastRender = updated;
  
    patch(this.$root, patches);
  }

  onInit() {  }

  redefineProps(props: IIterable<any>) {
    this.props = props;
  }

  dispatch(event: string, message: IIterable<any> | any) {
    if (!this.vNode || !this.vNode.parent) return;

    const parent = this.vNode.parent.instance;
    
    if (!parent) return;

    const callback = getProto(parent)[event];

    if (callback) {
      callback.call(parent, message);
    }
  }
}

export default Component;
