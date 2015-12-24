import 'babel-core/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import TodoApp from './containers/TodoApp';
import configureStore from './store/configureStore';
import fetch from 'isomorphic-fetch';
import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';

fetch('/api/todos')
.then(res => res.json())
.then(data => {
  console.log(data);
  const store = configureStore({ todos: data });

  render(
    <Provider store={store}>
      <TodoApp />
    </Provider>,
    document.getElementById('root')
  );
});


