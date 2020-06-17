class About {
  render() {
    return /* html */ `
      <div>
        About!
      </div>
    `
  }
}

class Greeting {
  render() {
    return /* html */ `
      <div>
        Hello!
      </div>
    `
  }
}

class App {
  nav(url) {
    this.$router.go(url);
  }

  render() {
    console.log('Render function called!');

    return /* html */ `
      <div>
        Other content
        <button @click="nav('/example/greeting')">Greeting</button>
        <button @click="nav('/example/about')">About</button>
        <button @click="nav('/example/')">Home</button>
        <Iris.Router />
      </div>
    `
  }
}

Iris.install(
  new Router({
    baseUrl: '/example',
    routes: [
      {
        path: '/',
        component: Iris.Empty
      },
      {
        path: '/greeting',
        component: Greeting
      },
      {
        path: '/about',
        component: About
      }
    ]
  })
)

Iris.mount(
  App,
  '#root'
);
