import { useState, useEffect, useRef } from "react";
import Die from "./components/Die";
import congratsMp3 from "./congrats.mp3";
import Confetti from "react-confetti";
import Leaderboard from "./components/Leaderboard";
import Suggestions from "./components/Suggestions";
import Header from "./components/Header";
import { nanoid } from "nanoid";
import axios from "axios";
function App() {
  let pantryID = "319f2108-7202-4669-9979-bfbd309ebdd7";
  let pantryBasketName = "Leaderboards";

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
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [interval, setIntervalState] = useState(null); //this is what made possible to cancel

  //USEEFFECT load leaderboard from pantry to leaderboard state

  useEffect(() => {
    var myHeaders = new Headers();
    let arr = [];
    myHeaders.append("Content-Type", "application/json");

    var config = {
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

  const congratsAudio = new Audio(congratsMp3);
  useEffect(() => {
    if (compareArrays(heldDice, dice)) {
      setTenzies(true);
      setIntervalState(null);
      congratsAudio.play();

      // push num of rolls and time taken to leaderboard
      let timeDiff = ((timeElapsed - startTime) / 1000).toFixed(2);

      const obj = { name: userName, count: count, timeTaken: timeDiff };
      obj.id = nanoid();
      setUserId(obj.id);
      // update our leaderboard JSON with the new record

      var data = JSON.stringify({
        [obj.id]: obj,
      });

      var config = {
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
    // localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  }, [leaderboard]);
  function compareArrays(a, b) {
    if (JSON.stringify(a) === JSON.stringify(b)) {
      console.log(a, b);
      let reducedA = new Set(a);
      let reducedB = new Set(a);
      let cond1 = reducedA.keys().next().value === reducedB.keys().next().value;
      let cond2 = reducedA.size === 1 && reducedB.size === 1;
      console.log(cond1, cond2);
      if (cond1 && cond2) {
        return true;
      } else {
        return false;
      }
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
    </>
  );
}

export default App;
