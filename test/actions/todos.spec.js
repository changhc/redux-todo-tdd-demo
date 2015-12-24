import { expect } from 'chai';
import * as types from '../../src/actionTypes';
import * as actions from '../../src/actions/todos';

describe('todo actions', () => {
  it('addTodo should create ADD_TODO action', () => {
    expect(actions.addTodo('Use Redux')).to.deep.equal({
      type: types.ADD_TODO,
      text: 'Use Redux'
    });
  });

  it('deleteTodo should create DELETE_TODO action', () => {
    expect(actions.deleteTodo(1)).to.deep.equal({
      type: types.DELETE_TODO,
      id: 1
    });
  });

  it('completeTodo should create TOGGLE_TODO action', () => {
    expect(actions.toggleTodo(1)).to.deep.equal({
      type: types.TOGGLE_TODO,
      id: 1
    });
  });
});
