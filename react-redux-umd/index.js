function getAllTodos () {
  return [
    {
      id: 1,
      text: 'Go to work and then work harder',
      status: 'FINISHED'
    },
    {
      id: 2,
      text: 'Walk steps less than 10000',
      status: 'UN_FINISHED'
    },
    {
      id: 3,
      text: 'Run as long as you will',
      status: 'UN_FINISHED'
    }
  ];
}

function reducer (state = getAllTodos(), action) {
  switch (action.type) {
    case 'SHOW_ALL':
      return getAllTodos();
    case 'FINISHED':
      return state.filter(item => item.status === 'FINISHED');
    case 'UN_FINISHED':
      return state.filter(item => item.status === 'UN_FINISHED');
    default:
      return state;
  }
}

const store = Redux.createStore(reducer);

function mapStateToProps (state, ownProps) {
  return {
    todos: state
  };
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    onChange: (e) => {
      const checked = e.target.checked;
      checked ? dispatch({ type: 'FINISHED' })
        : dispatch({ type: 'SHOW_ALL' });
    }
  };
}

class Todo extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className='Todo'>
        {this.props.todo.text}
      </div>
    );
  }
}

class TodoList extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="TodoList">
        {
          this.props.todos.map((item, index) => (
            <Todo key={item.id} todo={item}/>
          ))
        }
      </div>
    );
  }
}

class TodoHeader extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className='TodoHeader'>
        <label>
          Finished <input onChange={this.props.onChange} type="checkbox"/>
        </label>
      </div>
    );
  }
}

class App extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {

  }

  render () {
    const TodoListConnect = ReactRedux.connect(mapStateToProps)(TodoList);

    const TodoHeaderConnect = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(TodoHeader);

    return (
      <ReactRedux.Provider store={store}>
        <div className="App">
          <TodoHeaderConnect/>
          <TodoListConnect/>
        </div>
      </ReactRedux.Provider>

    );
  }
}

ReactDOM.render(<App/>, document.querySelector('#root'));