import React, { Component, PropTypes } from 'react';
import CountDisplay from './CountDisplay';

class Footer extends Component {
  render() {
    const { todos } = this.props;
    return (
      <footer className="footer">
        <CountDisplay count={todos.filter(t => !t.isCompleted).length} />
      </footer>
    );
  }
}

Footer.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired
  }))
};

export default Footer;
