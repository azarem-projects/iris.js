class Component1 {
  render() {
    return /* html */ `
      <div>
        Component 1
      </div>
    `
  }
}

class CustomInput {
  handleInput() {
    this.dispatch('set-model', event.target.checked);
  }

  render() {
    return /* html */ `
      <div>
        <input type="checkbox" @click="handleInput" :checked="props.model" />
      </div>
    `
  }
}

class App {
  state = {
    input: true
  }

  components = {
    Component1,
    CustomInput
  }

  sayHi(arg) {
    console.log(arg);
  }

  render() {
    return /* html */ `
      <div>
        <h3> {{ state.input }} </h3>
        <CustomInput i-model="input" />
      </div>
    `
  }
}

Iris.mount(Iris.createElement(App), '#root');
