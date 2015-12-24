import { expect } from 'chai';
import todos from '../../src/reducers/todos';
import * as types from '../../src/actionTypes';

describe('todos reducer', () => {
  it('should handle initial state', () => {
    expect(
      todos(undefined, {})
    ).to.deep.equal([
      {
        text: 'Use Redux',
        isCompleted: false,
        id: 0
      }
    ]);
  });

  it('should handle ADD_TODO', () => {
    expect(
      todos([], {
        type: types.ADD_TODO,
        text: 'Run the tests'
      })
    ).to.deep.equal([
      {
        text: 'Run the tests',
        isCompleted: false,
        id: 0
      }
    ]);

    expect(
      todos([
        {
          text: 'Use Redux',
          isCompleted: false,
          id: 0
        }
      ], {
        type: types.ADD_TODO,
        text: 'Run the tests'
      })
    ).to.deep.equal([
      {
        text: 'Run the tests',
        isCompleted: false,
        id: 1
      }, {
        text: 'Use Redux',
        isCompleted: false,
        id: 0
      }
    ]);

    expect(
      todos([
        {
          text: 'Run the tests',
          isCompleted: false,
          id: 1
        }, {
          text: 'Use Redux',
          isCompleted: false,
          id: 0
        }
      ], {
        type: types.ADD_TODO,
        text: 'Fix the tests'
      })
    ).to.deep.equal([
      {
        text: 'Fix the tests',
        isCompleted: false,
        id: 2
      }, {
        text: 'Run the tests',
        isCompleted: false,
        id: 1
      }, {
        text: 'Use Redux',
        isCompleted: false,
        id: 0
      }
    ]);
  });

  it('should handle DELETE_TODO', () => {
    expect(
      todos([
        {
          text: 'Run the tests',
          isCompleted: false,
          id: 1
        }, {
          text: 'Use Redux',
          isCompleted: false,
          id: 0
        }
      ], {
        type: types.DELETE_TODO,
        id: 1
      })
    ).to.deep.equal([
      {
        text: 'Use Redux',
        isCompleted: false,
        id: 0
      }
    ]);
  });

  it('should handle TOGGLE_TODO', () => {
    expect(
      todos([
        {
          text: 'Run the tests',
          isCompleted: false,
          id: 1
        }, {
          text: 'Use Redux',
          isCompleted: false,
          id: 0
        }
      ], {
        type: types.TOGGLE_TODO,
        id: 1
      })
    ).to.deep.equal([
      {
        text: 'Run the tests',
        isCompleted: true,
        id: 1
      }, {
        text: 'Use Redux',
        isCompleted: false,
        id: 0
      }
    ]);

    expect(
      todos([
        {
          text: 'Run the tests',
          isCompleted: true,
          id: 1
        }, {
          text: 'Use Redux',
          isCompleted: true,
          id: 0
        }
      ], {
        type: types.TOGGLE_TODO,
        id: 1
      })
    ).to.deep.equal([
      {
        text: 'Run the tests',
        isCompleted: false,
        id: 1
      }, {
        text: 'Use Redux',
        isCompleted: true,
        id: 0
      }
    ]);
  });
});
