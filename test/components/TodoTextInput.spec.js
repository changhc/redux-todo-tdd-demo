import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import {
  createRenderer
} from 'react-addons-test-utils';
import TodoTextInput from '../../src/components/TodoTextInput';

function setup(propOverrides) {
  const props = Object.assign({
    onSave: spy(),
    text: 'TDD Demo',
    placeholder: 'What needs to be done?'
  }, propOverrides);

  const renderer = createRenderer();

  renderer.render(
    <TodoTextInput {...props} />
  );

  const output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
    renderer: renderer
  };
}

describe('components', () => {
  describe('TodoTextInput', () => {
    it('should render correctly', () => {
      const { output } = setup();
      expect(output.props.placeholder).to.equal('What needs to be done?');
      expect(output.props.value).to.equal('TDD Demo');
      expect(output.props.className).to.equal('new-todo');
    });

    it('should update value on change', () => {
      const { output, renderer } = setup();
      output.props.onChange({ target: { value: 'Use Redux' } });
      const updated = renderer.getRenderOutput();
      expect(updated.props.value).to.equal('Use Redux');
    });

    it('should call onSave on return key press', () => {
      const { output, props } = setup();
      output.props.onKeyDown({ which: 13, target: { value: 'TDD Demo' } });
      expect(props.onSave).to.have.been.calledWith('TDD Demo');
    });

    it('should reset state on return key press', () => {
      const { output, renderer } = setup();
      output.props.onKeyDown({ which: 13, target: { value: 'TDD Demo' } });
      const updated = renderer.getRenderOutput();
      expect(updated.props.value).to.equal('');
    });
  });
});
