import Iris from '@/core/iris';

class StateManager extends Iris.Plugin {
  state: IIterable<any> = {};

  constructor(initialState: IIterable<any>) {
    super();

    Object.assign(this.state, initialState);
  }

  setState(newState: IIterable<any>) {
    this.state = Object.assign(this.state, newState);
  
    if (Iris.vApp.component) {
      Iris.vApp.component.forceUpdate()
    }
  }

  inject() {
    return {
      $store: {
        state: this.state,
        setState: this.setState
      }
    }
  }
}

export default StateManager;
