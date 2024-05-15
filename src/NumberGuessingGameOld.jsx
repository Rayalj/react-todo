// NumberGuessingGame.js

import React, { Component } from 'react';
import GuessControl from './GuessControl';

class NumberGuessingGameOld extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberToGuess: Math.floor(Math.random() * 100) + 1,
      numberOfGuesses: 0,
      latestGuess: null
    };
  }

  handleGuess = (guess) => {
    this.setState((prevState) => ({
      latestGuess: guess,
      numberOfGuesses: prevState.numberOfGuesses + 1
    }));
  };

  handleReset = () => {
    this.setState({
      numberToGuess: Math.floor(Math.random() * 100) + 1,
      numberOfGuesses: 0,
      latestGuess: null
    });
  };

  render() {
    return (
      <div>
        <GuessControl onGuess={this.handleGuess} />
        {/* More game logic here */}
        <button onClick={this.handleReset}>Reset</button>
      </div>
    );
  }
}

export default NumberGuessingGameOld;

