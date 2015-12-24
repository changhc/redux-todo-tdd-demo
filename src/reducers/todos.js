import { ADD_TODO, DELETE_TODO, TOGGLE_TODO } from '../actionTypes';

const initialState = [
  {
    text: 'Use Redux',
    isCompleted: false,
    id: 0
  }
];

export default function todos(state = initialState, action) {
  switch (action.type) {
  case ADD_TODO:
    return [
      {
        id: action.id,
        isCompleted: false,
        text: action.text
      },
      ...state
    ];

  case DELETE_TODO:
    return state.filter(todo =>
      todo.id !== action.id
    );

  case TOGGLE_TODO:
    return state.map(todo =>
      todo.id === action.id ?
        Object.assign({}, todo, { isCompleted: !todo.isCompleted }) :
        todo
    );

  default:
    return state;
  }
}
