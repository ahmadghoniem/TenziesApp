import { useState, useEffect } from "react";
import Dice from "./components/Dice";
import congrats from "./congrats.mp3";
import "./App.css";
import Confetti from "react-confetti";
import Leaderboards from "./components/leaderboards";

function App() {
  const [randNumArr, setRandNumArr] = useState(() => allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [fixedIndecies, setFixedIndecies] = useState([...Array(10)]);
  const [leaderboards, setLeaderboards] = useState(
    () => JSON.parse(localStorage.getItem("leaderboards")) || {}
  );
  const [count, setCount] = useState(0);
  const congratsSound = new Audio(congrats);

  useEffect(() => {
    if (compareArrays(fixedIndecies, randNumArr)) {
      setTenzies(true);
      congratsSound.play();
      // push num of rolls and time taken to leaderboard
    } else {
      setTenzies(false);
    }
  }, [fixedIndecies]);

  function compareArrays(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  function bubbleSort() {}
  function allNewDice() {
    return [...Array(10)].map((_) => ~~(Math.random() * 6));
  }

  function rollDice() {
    setCount((prevCount) => count + 1);
    if (!tenzies) {
      let arr = randNumArr;
      for (let i = 0; i < arr.length; i++) {
        if (fixedIndecies[i] !== undefined) continue;
        arr[i] = ~~(Math.random() * 6);
      }
      setRandNumArr([...arr]);
    } else {
      setFixedIndecies([...Array(10)]);
      setRandNumArr(allNewDice());
      setCount(0);
    }
  }

  let dicesArr = randNumArr.map((e, i) => (
    <Dice
      key={i}
      index={i}
      value={e}
      setFixedIndecies={setFixedIndecies}
      fixedIndecies={fixedIndecies}
    />
  ));

  return (
    <>
      <main>
        <Leaderboards />
        <div className="game-container">
          {tenzies && <Confetti />}
          <h1>Tenzies</h1>
          <p>
            Roll until all dice are the same. Click each dice to freeze it at
            its current value between rolls.
          </p>
          <div className="dice-container">{dicesArr}</div>
          <button className="roll-dice" onClick={rollDice}>
            {!tenzies
              ? `Roll 
        ${count}`
              : `New Game?`}
          </button>
        </div>
      </main>
    </>
  );
}

export default App;
