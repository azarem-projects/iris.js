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
    CustomInput
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
