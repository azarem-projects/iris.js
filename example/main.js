/** @jsx Iris.createElement */

class Album {
  remove() {
    this.dispatch('remove', this.props.key);
  }

  render() {
    return (
      <div>
        <div className='row'>
          {this.props.title}
          <button onClick={() => {
            this.remove();
          }}>
            Remove
          </button>
        </div>
      </div>
    );
  }
}

class Wrapper {
  state = {
    count: 0
  }

  plus() {
    this.setState({ count: this.state.count + 1 })
  }

  render() {
    return (
      <span>
        <VisibleCounter count={this.state.count} />
        <button onClick={() => { this.plus() }}>Click</button>
      </span>
    )
  }
}

class VisibleCounter {
  render() {
    return (
      <div>
        { Array.from({ length: this.props.count }).map(_ => `I`) }
      </div>
    )
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
      url: 'https://jsonplaceholder.typicode.com/posts',
    });

    this.setState({
      albums: [...result.data],
    });
  }

  state = {
    albums: []
  };

  remove(id) {    
    const albums = this.state.albums;
    const index = albums.findIndex((album) => album.id === id);
    
    albums.splice(index, 1);

    this.setState({
      albums,
    });
  }

  render() {
    return (
      <div>
        <div>
          <button
            onClick={() => {
              this.loadData();
            }}
          >
            Load data
          </button>
          {this.state.albums.map((album) => (
            <Album key={album.id} url={album.url} title={album.body} />
          ))}
        </div>
      </div>
    );
  }
}

class Child {
  state = {
    msg: 'Hello, world!'
  }

  template() {
    return `
      <div>
        <span> {{ props.key }} </span>
      </div>
    `
  }

  // render() {
  //   return (
  //     <div>
  //       <span> { this.props.key } </span>
  //     </div>
  //   )
  // }
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

  template() {
    return `
      <div>
        <h2 title="foo" id="bar">FOO</h2>
        <Child :key="state.variable" />
      </div>
    `
  }

  // render() {
  //   return (
  //     <div>
  //       <h2 title="foo" id="bar">FOO</h2>
  //       <Child key={this.state.variable} />
  //     </div>
  //   );
  // }
}

class App {
  state = {
    n: Math.random(),
    count: 0
  }

  go(url) {
    this.$router.go(url);
  }

  render() {
    return (
      <div className='THIS'>
        <button onClick={() => {
          this.go('/example/greeting');
        }}>
          Greeting
        </button>
        <button onClick={() => {
          this.go('/example/about');
        }}>
          About
        </button>
        <Wrapper />
        <button>
          { this.state.n }
        </button>
        <Iris.Router />
      </div>
    );
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

Iris.mount(Iris.createElement(App, null), '#root');
