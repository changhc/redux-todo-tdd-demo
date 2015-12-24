import React from 'react';
import { expect } from 'chai';
import {
  createRenderer
} from 'react-addons-test-utils';
import Footer from '../../src/components/Footer';
import CountDisplay from '../../src/components/CountDisplay';

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
    ]
  }, propOverrides);

  const renderer = createRenderer();
  renderer.render(<Footer {...props} />);
  const output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
    renderer: renderer
  };
}

describe('components', () => {
  describe('Footer', () => {
    it('should render container', () => {
      const { output } = setup();
      expect(output.type).to.equal('footer');
      expect(output.props.className).to.equal('footer');
    });

    describe('counter', () => {
      it('should render', () => {
        const { output } = setup();
        const counter = output.props.children;
        expect(counter.type).to.equal(CountDisplay);
        expect(counter.props.count).to.equal(1);
      });
    });
  });
});
