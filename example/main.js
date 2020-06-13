/** @jsx Iris.createElement */

class Album extends Iris.Component {
  remove() {
    this.dispatch('remove', this.props.key);
  }

  render() {
    return (
      <div>
        <div className="row">
          { this.props.title }
          <button onClick={() => { this.remove() }}>Remove</button>
        </div>
      </div>
    )
  }
}

class Greeting extends Iris.Component {
  render() {
    return (
      <div>
        <div>
          Hello, world!
        </div>
      </div>
    )
  }
}

class About extends Iris.Component {
  render() {
    return (
      <div>
        <div>
          About
        </div>
      </div>
    )
  }
}

class App extends Iris.Component {
  async loadData() {
    const result = await this.$ajax.request({
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/comments'
    })

    this.setState({
      albums: [...result.data]
    })
  }

  onInit() {
    // this.loadData()
  }

  remove(id) {
    const albums = this.state.albums;
    const index = albums.findIndex(album => album.id === id);

    albums.splice(index, 1);

    this.setState({
      albums
    })
  }

  state = {
    albums: [
    ]
  };

  render() {
    return (
      <div className="THIS">
        <button onClick={() => { this.loadData() }}>Load data</button>
        <this.$router.View />
        <div>
          { this.state.albums.map(album => 
            <Album key={album.id} url={album.url} title={album.body} />
          ) }
        </div>
      </div>
    )
  }
}

Iris.install(
  new StateManager({
    foo: 'bar'
  })
)

Iris.install(
  new Ajax()
)

Iris.install(
  new Router([
    {
      component: Greeting,
      path: '/greeting'
    },
    {
      component: About,
      path: '/about'
    },
  ])
)

Iris.mount(
  Iris.createElement(App, null),
  '#root'
);
