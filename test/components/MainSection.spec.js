import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import {
  createRenderer
} from 'react-addons-test-utils';
import MainSection from '../../src/components/MainSection';
import TodoItem from '../../src/components/TodoItem';

function setup(propOverrides) {
  const props = Object.assign({
    todos: [
      {
        text: 'TDD Demo',
        isCompleted: false,
        id: 0
      }, {
        text: 'Run the tests',
        isCompleted: true,
        id: 1
      }
    ],
    actions: {
      deleteTodo: spy(),
      toggleTodo: spy()
    }
  }, propOverrides);

  const renderer = createRenderer();
  renderer.render(<MainSection {...props} />);
  const output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
    renderer: renderer
  };
}

describe('components', () => {
  describe('MainSection', () => {
    it('should render container', () => {
      const { output } = setup();
      expect(output.type).to.equal('section');
      expect(output.props.className).to.equal('main');
    });

    describe('todo list', () => {
      it('should render', () => {
        const { output, props } = setup();
        const list = output.props.children;
        expect(list.type).to.equal('ul');
        expect(list.props.children.length).to.equal(2);
        list.props.children.forEach((item, i) => {
          expect(item.type).to.equal(TodoItem);
          expect(item.props.todo).to.equal(props.todos[i]);
        });
      });
    });
  });
});
