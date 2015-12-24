import 'babel-core/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import TodoApp from './containers/TodoApp';
import configureStore from './store/configureStore';
import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';

const store = configureStore();

render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
);
