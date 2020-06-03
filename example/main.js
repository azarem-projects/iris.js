/** @jsx Iris.createElement */

class TitleComponent extends Iris.Component {
  render() {
    return (
      <div>
        <h2>I am a todo app { this.$store.state.foo } </h2>
      </div>
    );
  }
}

class CreateTodoComponent extends Iris.Component {
  state = {
    title: '',
  };

  handleInput() {
    this.setState({
      title: event.target.value,
    });

    this.$store.setState({
      foo: event.target.value
    })
  }

  handleClick() {
    this.dispatch('add', this.state.title);
  }

  render() {
    return (
      <div>
        <input
          onInput={() => {
            this.handleInput();
          }}
        />
        <button
          onClick={() => {
            this.handleClick();
          }}
        >
          { this.$store.state.foo } 
        </button>
      </div>
    );
  }
}

class TodoComponent extends Iris.Component {
  done() {
    this.dispatch('done', this.props.key);
  }

  remove() {
    this.dispatch('remove', this.props.key);
  }

  render() {
    return (
      <div>
        <div style='width: 200px; justify-content: space-between; display: flex;'>
          <h3> {this.props.title} </h3>
          <button
            onClick={() => {
              this.done();
            }}
          >
            {this.props.done}
          </button>
          <button
            onClick={() => {
              this.remove();
            }}
          >
            x
          </button>
        </div>
      </div>
    );
  }
}

class TodosListComponent extends Iris.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: Math.random(),
    };
  }

  done(i) {
    this.dispatch('done', i);
  }

  remove(i) {
    this.dispatch('remove', i);
  }

  render() {
    return (
      <div>
        <h1> {this.state.count.toString()} </h1>
        {this.props.todos.map((el, i) => (
          <TodoComponent key={i} title={el.title} done={el.done} />
        ))}
      </div>
    );
  }
}

class Button extends Iris.Component {
  beforeRender(el) {
    el.style.cssText = `
      padding: 10px;
      margin: 10px;
      border: none;
      border-radius: 50%;
      outline: none;
    `;
  }

  render() {
    return (
      <button className="stylized-button" onClick={ this.props.onClick }>
        { this.props.title }
      </button>
    )
  }
}

class App extends Iris.Component {
  done(i) {
    const todos = this.state.todos;
    todos[i].done = !todos[i].done;

    this.setState({
      todos,
    });
  }

  remove(i) {
    const todos = this.state.todos;
    todos.splice(i, 1);

    this.setState({
      todos,
    });
  }

  add(title) {
    this.setState({
      todos: [
        ...this.state.todos,
        {
          title,
          done: false,
        },
      ],
    });
  }

  state = {
    bool: true,
    todos: [
      {
        title: 'first',
        done: false,
      },
    ],
  };

  change() {
    const i = Math.round(Math.random() * (this.state.todos.length - 1));
    const todos = this.state.todos;

    todos[i].title = 'Lorem ipsum..';

    this.setState({
      todos,
    });
  }

  onInit() {
    this.$store.setState({
      foo: 'baz'
    })

    this.setState({
      todos: [
        ...this.state.todos,
        {
          title: 'foo',
          done: false
        }
      ]
    })
  }

  handleChange() {
    this.setState({
      bool: !this.state.bool
    })
  }

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.change();
          }}
        >
          Change something..
        </button>
        
        <Button onClick={ () => { this.handleChange() } } title={'Change bool'} />

        <TitleComponent />
        <CreateTodoComponent />

        {
          this.state.bool
            ? <TodosListComponent todos={this.state.todos} />
            : <span></span>
        }
      </div>
    );
  }
}

Iris.install(
  new StateManager({
    foo: 'bar'
  })
)

Iris.mount(
  <App />,
  '#root'
);
