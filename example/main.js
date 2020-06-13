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

class App extends Iris.Component {
  async loadData() {
    const result = await this.$ajax.request({
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/comments'
    })

    console.log(result);

    this.setState({
      albums: [...result.data]
    })
  }

  onInit() {
    this.loadData()
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
      <div>
        <button onClick={() => { this.loadData() }}>Load data</button>
        <div>
          { this.state.albums.map(album => (

            <Album key={album.id} url={album.url} title={album.body} />

          )) }
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

Iris.mount(
  Iris.createElement(App, null),
  '#root'
);
