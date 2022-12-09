import React, {useState, useEffect} from "react";
import {nanoid} from 'nanoid';
import Dice from './Dice';
import Confetti from 'react-confetti';
import "./style.css";

/*
Features have not added yet:
timer
best time
*/

export default function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allIsHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].value;
    const allSameNumber = dice.every(die => die.value === firstValue)

    if(allIsHeld && allSameNumber) {
      setTenzies(true)
    }

  }, [dice])

  function generateRandomNumber() {
    const randomNumber = {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
    return randomNumber
  }

  function allNewDice() {
    const newDice = [];
    for(let i = 0; i < 10; i++) {
      newDice.push(generateRandomNumber())
    }
    return newDice;
  }

  function roll() {
    if(!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateRandomNumber()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  function handleHeld(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  const diceElements = dice.map(die => {
    return(
      <Dice
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        handleHeld={() => handleHeld(die.id)}
      />
    );
  })

  return (
    <main>
      {tenzies && <Confetti width={innerWidth} height={innerHeight} />}
      <h1 className="game-title">Tenzies Game</h1>
      <div className="dice-container">
      {diceElements}
      </div>
      <button
       className="dice-button"
       onClick={roll}
       >
        {tenzies ? "New Game" : "Roll"}
       </button>
    </main>
  );
}
