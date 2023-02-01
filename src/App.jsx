import { useState, useEffect, useRef } from "react";
import Die from "./components/Die";
import congratsMp3 from "./congrats.mp3";
import Confetti from "react-confetti";
import Leaderboard from "./components/Leaderboard";
import Suggestions from "./components/Suggestions";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { nanoid } from "nanoid";
function App() {
  const [dice, setDice] = useState(() => allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [heldDice, setheldDice] = useState([...Array(10)]);
  const [leaderboard, setLeaderboard] = useState(
    () => JSON.parse(localStorage.getItem("leaderboard")) || []
  );
  const [userName, setuserName] = useState(
    () => localStorage.getItem("tenziesName") || undefined
  );
  const [userId, setUserId] = useState(0);
  const [count, setCount] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [interval, setIntervalState] = useState(null); //this is what made possible to cancel

  //USEEFFECT STORE A RANDOM NAME AS USERNAME AND DISPLAY IT

  const congratsAudio = new Audio(congratsMp3);
  useEffect(() => {
    if (compareArrays(heldDice, dice)) {
      setTenzies(true);
      setIntervalState(null);
      congratsAudio.play();

      // push num of rolls and time taken to leaderboard
      let timeDiff = ((timeElapsed - startTime) / 1000).toFixed(2);

      setLeaderboard((prevLeaderBoard) => {
        const obj = { name: userName, count: count, timeTaken: timeDiff };
        obj.id = nanoid();
        setUserId(obj.id);

        return [...prevLeaderBoard, obj];
      });
    } else {
      setTenzies(false);
    }
  }, [heldDice]);
  // the reason why we have heldDice as a dependency instead of dice array is because the last move would be holding the last dice not rolling the last dice
  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest function.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }

      if (delay !== null) {
        let id = setInterval(tick, delay);

        //cleaning function set for the future (autoexecuted when "delay" change)
        return () => {
          //console.log("clear Interval: " + id);
          clearInterval(id);
        };
      }
    }, [delay]);
  }
  useInterval(() => {
    setTimeElapsed(new Date().getTime());
  }, interval);

  useEffect(() => {
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  }, [leaderboard]);
  function compareArrays(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  function allNewDice() {
    return [...Array(10)].map((_) => ~~(Math.random() * 6) + 1);
  }

  function rollDice() {
    if (!tenzies) {
      setCount((prevCount) => prevCount + 1);
      if (count === 0) {
        // start the counter but don't roll the dices that have been initialized the user just started !
        setStartTime(new Date().getTime());
        setIntervalState(10);
        return;
      }
      setDice((prevDiceSet) => {
        for (let i = 0; i < prevDiceSet.length; i++) {
          if (heldDice[i] !== undefined) continue;
          prevDiceSet[i] = ~~(Math.random() * 6) + 1;
        }
        return prevDiceSet;
      });
    } else {
      // user decides to play again
      setheldDice([...Array(10)]);
      setDice(allNewDice());
      setCount(0);
      setStartTime(0);
      setTimeElapsed(0);
    }
  }
  let diceArr = dice.map((e, i) => (
    <Die
      key={i}
      index={i}
      value={e}
      count={count}
      setheldDice={setheldDice}
      heldDice={heldDice}
      tenzies={tenzies}
    />
  ));

  return (
    <>
      <Header />
      <main className="App">
        <Leaderboard leaderboard={leaderboard} userId={userId} />
        <div className="game-container">
          {tenzies && <Confetti />}
          <h1>Tenzies 🎲</h1>
          <p>
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
          <div className="dice-container">{diceArr}</div>

          <div className="dice-container-bottom">
            <span className="roll-number">{count}</span>
            <button className="roll-dice" onClick={rollDice}>
              {!tenzies ? `${count === 0 ? `Start!` : `Roll`}` : `Play again!`}
            </button>
            <p className="time-elapsed">
              {((timeElapsed - startTime) / 1000).toFixed(2) >= 0 &&
                ((timeElapsed - startTime) / 1000).toFixed(2)}
            </p>
          </div>
        </div>
        <Suggestions userName={userName} setUserName={setuserName} />
      </main>
      <Footer />
    </>
  );
}

export default App;
