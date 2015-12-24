import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import {
  createRenderer
} from 'react-addons-test-utils';
import Header from '../../src/components/Header';
import TodoTextInput from '../../src/components/TodoTextInput';

function setup() {
  const props = {
    addTodo: spy()
  };

  const renderer = createRenderer();
  renderer.render(<Header {...props} />);
  const output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
    renderer: renderer
  };
}

describe('components', () => {
  describe('Header', () => {
    it('should render correctly', () => {
      const { output } = setup();

      expect(output.type).to.equal('header');
      expect(output.props.className).to.equal('header');

      const [ h1, input ] = output.props.children;

      expect(h1.type).to.equal('h1');
      expect(h1.props.children).to.equal('todos');

      expect(input.type).to.equal(TodoTextInput);
      expect(input.props.placeholder).to.equal('What needs to be done?');
    });

    it('should call addTodo if length of text is greater than 0', () => {
      const { output, props } = setup();
      const input = output.props.children[1];
      input.props.onSave('');
      expect(props.addTodo).to.not.have.been.called;
      input.props.onSave('Use Redux');
      expect(props.addTodo).to.have.been.calledOnce;
    });
  });
});
