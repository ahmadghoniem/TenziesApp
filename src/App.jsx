import { useState, useEffect } from "react";
import Die from "./components/Die";
import congratsMp3 from "./congrats.mp3";
import Confetti from "react-confetti";
import Leaderboard from "./components/Leaderboard";
import Suggestions from "./components/Suggestions";
import Header from "./components/Header";
import { nanoid } from "nanoid";
import axios from "axios";
import TimeElapsedDisp from "./components/TimeElapsedDisp";
function App() {
  const pantryID = "319f2108-7202-4669-9979-bfbd309ebdd7";
  const pantryBasketName = "Leaderboards";
  const congratsAudio = new Audio(congratsMp3);

  const [dice, setDice] = useState(() => allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [heldDice, setheldDice] = useState([...Array(10)]);
  // const [leaderboard, setLeaderboard] = useState(
  //   () => JSON.parse(localStorage.getItem("leaderboard")) || []
  // );
  const [leaderboard, setLeaderboard] = useState([]);
  const [userName, setuserName] = useState(
    () => localStorage.getItem("tenziesName") || "Guest"
  );
  const [userId, setUserId] = useState(0);
  const [count, setCount] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [interval, setInterval] = useState(null);

  // this is what made possisetIntervalble to stop the interval

  // USEEFFECT to load leaderboard from pantry to leaderboard state
  useEffect(() => {
    const myHeaders = new Headers();
    let arr = [];
    myHeaders.append("Content-Type", "application/json");

    const config = {
      method: "get",
      url: `https://getpantry.cloud/apiv1/pantry/${pantryID}/basket/${pantryBasketName}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config).then((result) => {
      result = result.data;
      Object.keys(result).forEach((e) => {
        arr.push({ id: e, ...result[e] });
      });
      setLeaderboard(arr);
    });
  }, []);

  useEffect(() => {
    if (compareArrays(heldDice, dice)) {
      setTenzies(true);
      setInterval(null);
      congratsAudio.play();

      // push num of rolls and time taken to leaderboard
      let endTime = new Date();
      let timeDiff = ((endTime - startTime) / 1000).toFixed(2);

      const obj = { name: userName, count: count, timeTaken: timeDiff };
      obj.id = nanoid();
      setUserId(obj.id);
      // update our leaderboard JSON with the new record

      const data = JSON.stringify({
        [obj.id]: obj,
      });

      const config = {
        method: "put",
        url: `https://getpantry.cloud/apiv1/pantry/${pantryID}/basket/${pantryBasketName}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config).then(function (response) {
        //console.log(JSON.stringify(response.data));
      });

      setLeaderboard((prevLeaderBoard) => {
        return [...prevLeaderBoard, obj];
      });
    } else {
      setTenzies(false);
    }
  }, [heldDice]);
  // the reason why we have heldDice as a dependency instead of dice array is because the last move would be holding the last dice not rolling the last dice

  // useEffect(() => {
  //   // localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  // }, [leaderboard]);

  function compareArrays(a, b) {
    if (JSON.stringify(a) === JSON.stringify(b)) {
      // if the two arrays are equal (doesn't mean a winning condition yet)
      // further check if there's only one unique element is selected on both (hence the new Set()) and equal on both
      let reducedA = new Set(a);
      let reducedB = new Set(a);
      let cond1 = [...reducedA][0] === [...reducedB][0];
      let cond2 = reducedA.size === 1 && reducedB.size === 1; // best practice
      //let cond2 = (reducedA.size === reducedB.size) == 1; // shorter and should work as reducedA.size === reducedB.size would work
      return cond1 && cond2; // returns true or false based on the conditions
    } else {
      return false;
    }
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
        setInterval(10);
        return;
      }
      setDice((prevDiceSet) => {
        for (let i = 0; i < prevDiceSet.length; i++) {
          if (heldDice[i] !== undefined) continue; // skips the dies that are held
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
      setInterval(null);
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
            <TimeElapsedDisp interval={interval} startTime={startTime} />
          </div>
        </div>
        <Suggestions userName={userName} setUserName={setuserName} />
      </main>
    </>
  );
}

export default App;
