import React, { Component, PropTypes } from 'react';

class TodoItem extends Component {
  render() {
    const { todo, toggleTodo, deleteTodo } = this.props;
    return (
      <li>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.isCompleted}
            onChange={() => toggleTodo(todo.id)}
          />
          <label>{todo.text}</label>
          <button className="destroy" onClick={() => deleteTodo(todo.id)}></button>
        </div>
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired
  }).isRequired,
  toggleTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired
};

export default TodoItem;
