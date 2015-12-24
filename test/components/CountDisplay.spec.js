import React from 'react';
import { expect } from 'chai';
import {
  createRenderer
} from 'react-addons-test-utils';
import CountDisplay from '../../src/components/CountDisplay';

function setup(count) {
  const props = { count };

  const renderer = createRenderer();

  renderer.render(
    <CountDisplay {...props} />
  );

  const output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
    renderer: renderer
  };
}

describe('components', () => {
  describe('CountDisplay', () => {
    it('should render no item when no props passed', () => {
      const { output } = setup();
      const text = output.props.children;
      expect(text).to.equal('no item');
    });

    it('should render no item when count=0 passed', () => {
      const { output } = setup(0);
      const text = output.props.children;
      expect(text).to.equal('no item');
    });

    it('should render 1 item when count=0 passed', () => {
      const { output } = setup(1);
      const [ strong, text ] = output.props.children;
      expect(strong.type).to.equal('strong');
      const number = strong.props.children;
      expect(number).to.equal('1');
      expect(text).to.match(/item/);
    });

    it('should render n items when count>1 passed', () => {
      const { output } = setup(2);
      const [ strong, text ] = output.props.children;
      expect(strong.type).to.equal('strong');
      const number = strong.props.children;
      expect(number).to.equal('2');
      expect(text).to.match(/items/);
    });
  });
});
