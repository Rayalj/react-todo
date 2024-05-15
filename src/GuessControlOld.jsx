// GuessControl.js

import React, { Component } from 'react';

class GuessControlOld extends Component {
  constructor(props) {
    super(props);
    this.state = { currentGuess: '' };
  }

  handleInputChange = (event) => {
    this.setState({ currentGuess: event.target.value });
  };

  onSubmitGuess = () => {
    this.props.onGuess(Number(this.state.currentGuess));
    this.setState({ currentGuess: '' });
  };

  render() {
    return (
      <div>
        <input
          type="number"
          value={this.state.currentGuess}
          onChange={this.handleInputChange}
        />
        <button onClick={this.onSubmitGuess}>Guess</button>
      </div>
    );
  }
}

export default GuessControlOld;
