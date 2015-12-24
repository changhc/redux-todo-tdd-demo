import React, { Component, PropTypes } from 'react';

class CountDisplay extends Component {
  render() {
    const { count } = this.props;
    if (count > 1) {
      return <span><strong>{`${count}`}</strong> items left</span>;
    } else if (count === 1) {
      return <span><strong>1</strong> item left</span>;
    }
    return <span>no item</span>;
  }
}

CountDisplay.propTypes = {
  count: PropTypes.number
};

CountDisplay.defaultProps = {
  count: 0
};

export default CountDisplay;
