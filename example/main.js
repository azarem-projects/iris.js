class Album {
  remove() {
    this.dispatch('remove', this.props.key);
  }

  render() {
    return `
      <div>
        <div class="row">
          {{ props.title }}
          <button @click="remove()">Remove</button>
          {{ props['album-id'] }}
        </div>
      </div>
    `
  }
}

class Wrapper {
  state = {
    count: 0
  }

  plus() {
    this.setState({ count: this.state.count + 1 })
  }

  components = {
    VisibleCounter
  }

  render() {
    return `
      <span>
        <VisibleCounter :count="state.count"></VisibleCounter>
        <button @click="plus()">Click ME</button>
      </span>
    `
  }
}

class VisibleCounter {
  state = {
    arr: [1, 2, 3]
  }

  render() {
    return `
      <div>
        <span i-for="el in Array.from({ length: props.count })">
          I
        </span>
      </div>
    `
  }
}

class Greeting {
  onLeave() {
    console.log('leaving greeting..');
  }

  onInit() {
    this.loadData();
  }

  onEnter() {
    this.setState({
      count: 0
    });
    
    this.loadData();
  }

  async loadData() {
    const result = await this.$ajax.request({
      method: 'GET',
      url: 'http://dummy.restapiexample.com/api/v1/employees',
    });

    this.setState({
      albums: [...result.data.data],
    });
  }

  state = {
    albums: [
    ]
  };

  components = {
    Album
  }

  remove(id) {    
    const albums = this.state.albums;
    const index = albums.findIndex((album) => album.id === id);
    
    albums.splice(index, 1);

    this.setState({
      albums,
    });
  }

  render() {
    return `
      <div>
        <button @click="loadData()">Load data</button>
        <Album i-for="(album, i) in state.albums" :key="album.id" :title="album.employee_name" :album-id="i"></Album>
      </div>
    `
  }
}

class Child {
  state = {
    msg: 'Hello, world!',
    n: Math.random()
  }

  render(h) {
    return h('div', null,
      h('span', null, `${this.props.key} text text ${this.state.msg} more text ${this.state.n} TEEXT`)
    )
  }
}

class About {
  components = {
    Child
  }

  state = {
    variable: 42
  }

  onLeave() {
    console.log('leaving about..');
  }

  render() {
    return `
      <div class="foobar">
        <h2 title="foo" id="bar">FOO</h2>
        <Child :key="state.variable + 1"></Child>
        <Child :key="state.variable + 2"></Child>
      </div>
    `
  }
}

class MyInput {
  state = {
    value: 0
  }

  handleChange() {
    this.setState({
      value: event.target.value || 0
    })
  }

  render() {
    return `
      <div>
        {{ state.value }}
        <input @input="handleChange()" />
        <div i-for="(el, i) in Array.from({ length: state.value })" :key="i">
          {{ (i + 1) }}. Hello!
        </div>
      </div>
    `
  }
}

class Checkbox {
  state = {
    value: false,
    model: '25'
  }
  
  check() {
    this.setState({
      value: !this.state.value
    })
  }

  handleChange() {
    this.setState({
      value: event.target.checked
    })
  }

  render() {
    return `
      <div>
        <div>
          {{ state.value }}
          <input type="checkbox" i-model="value" />
          <input type="button" value="Check" @click="check()" />
        </div>
        <div>
          {{ state.model }}
          <input i-model="model" placeholder="i-model" />
        </div>
      </div>
    `
  }
}

class App {
  state = {
    n: Math.random(),
    count: 0
  }

  go(url) {
    this.$router.go(url);
  }

  components = {
    Wrapper,
    MyInput,
    Checkbox,
    'Iris.Router': Iris.Router
  }

  render() {
    return `
      <div class="THIS">
        <button @click="go('/example/greeting')">
          Greeting
        </button>
        <button @click="go('/example/about')">
          About
        </button>
        <Wrapper></Wrapper>
        <Checkbox></Checkbox>
        <MyInput></MyInput>
        <button> {{ state.n }} </button>
        <Iris.Router></Iris.Router>
      </div>
    `
  }
}

Iris.install(
  new StateManager({
    foo: 'bar',
  })
);

Iris.install(new Ajax());

Iris.install(
  new Router({
    baseUrl: '/example',
    routes: [
      {
        component: Greeting,
        path: '/greeting',
      },
      {
        component: About,
        path: '/about',
      },
    ],
  })
);

Iris.mount(
  Iris.createElement(App),
  '#root'
);
