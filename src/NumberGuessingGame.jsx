// NumberGuessingGame.js

import React, { useState } from 'react';
import GuessControl from './GuessControl';

const NumberGuessingGame = () => {
  const [numberToGuess, setNumberToGuess] = useState(Math.floor(Math.random() * 100) + 1);
  const [numberOfGuesses, setNumberOfGuesses] = useState(0);
  const [latestGuess, setLatestGuess] = useState(null);

  const handleGuess = (guess) => {
    setLatestGuess(guess);
    setNumberOfGuesses(prev => prev + 1);
  };

  const handleReset = () => {
    setNumberToGuess(Math.floor(Math.random() * 100) + 1);
    setNumberOfGuesses(0);
    setLatestGuess(null);
  };

  return (
    <div>
      <GuessControl onGuess={handleGuess} />
      {/* More game logic here */}
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default NumberGuessingGame;
