import * as types from '../actionTypes';
import fetch from 'isomorphic-fetch';

export function addTodo(text, id) {
  return {
    type: types.ADD_TODO,
    text,
    id
  };
}

export function addTodoToServer(text) {
  return (dispatch) => {
    fetch('/api/todos', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text,
      })
    })
    .then(res => res.json())
    .then(data => {
      dispatch(addTodo(data.text, data.id));
    });
  };
}


export function deleteTodo(id) {
  return {
    type: types.DELETE_TODO,
    id
  };
}

export function deleteTodoFromServer(id) {
  return (dispatch) => {
    fetch(`/api/todos/${id}`, {
      method: 'delete',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        dispatch(deleteTodo(id));
      }
    });
  };
}

export function toggleTodo(id) {
  return {
    type: types.TOGGLE_TODO,
    id
  };
}

export function toggleTodoFromServer(id) {
  return (dispatch, getState) => {
    const todo = getState().todos.find(todo => todo.id === id);
    fetch(`/api/todos/${id}?isCompleted=${todo.isCompleted ? 0 : 1}`, {
      method: 'put',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        dispatch(toggleTodo(id));
      }
    });
  };
}
