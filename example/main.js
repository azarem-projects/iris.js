/** @jsx Iris.createElement */

class TitleComponent extends Iris.Component {
  render() {
    return (
      <div>
        <h2>I am a todo app</h2>
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
          Add
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
            {' '}
            {this.props.done}{' '}
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
        <TitleComponent />
        <CreateTodoComponent />
        <TodosListComponent todos={this.state.todos} />
      </div>
    );
  }
}

Iris.mount(<App />, '#root');
