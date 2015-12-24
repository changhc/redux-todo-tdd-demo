import * as types from '../actionTypes';

export function addTodo(text) {
  return {
    type: types.ADD_TODO,
    text
  };
}


export function deleteTodo(id) {
  return {
    type: types.DELETE_TODO,
    id
  };
}

export function toggleTodo(id) {
  return {
    type: types.TOGGLE_TODO,
    id
  };
}
