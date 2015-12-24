import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import {
  createRenderer
} from 'react-addons-test-utils';
import TodoItem from '../../src/components/TodoItem';

function setup() {
  const props = {
    todo: {
      id: 0,
      text: 'TDD Demo',
      isCompleted: false
    },
    deleteTodo: spy(),
    toggleTodo: spy()
  };

  const renderer = createRenderer();

  renderer.render(
    <TodoItem {...props} />
  );

  const output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
    renderer: renderer
  };
}

describe('components', () => {
  describe('TodoItem', () => {
    it('initial render', () => {
      const { output } = setup();

      expect(output.type).to.equal('li');

      const div = output.props.children;

      expect(div.type).to.equal('div');
      expect(div.props.className).to.equal('view');

      const [ input, label, button ] = div.props.children;

      expect(input.type).to.equal('input');
      expect(input.props.checked).to.equal(false);

      expect(label.type).to.equal('label');
      expect(label.props.children).to.equal('TDD Demo');

      expect(button.type).to.equal('button');
      expect(button.props.className).to.equal('destroy');
    });

    it('input onChange should call toggleTodo', () => {
      const { output, props } = setup();
      const input = output.props.children.props.children[0];
      input.props.onChange({});
      expect(props.toggleTodo).to.have.been.calledWith(0);
    });

    it('button onClick should call deleteTodo', () => {
      const { output, props } = setup();
      const button = output.props.children.props.children[2];
      button.props.onClick({});
      expect(props.deleteTodo).to.have.been.calledWith(0);
    });
  });
});
