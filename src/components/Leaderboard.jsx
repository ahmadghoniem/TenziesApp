import { useState } from "react";
import lbIcon from "../leaderboardIcon.svg";
export default function Leaderboard({ leaderboard, userId }) {
  let compareFunction;
  const [sortBy, setSortBy] = useState("rolls"); // default is to sort by rolls count
  switch (sortBy) {
    case "rolls":
      compareFunction = (a, b) => a.count - b.count;
      break;
    case "time":
      compareFunction = (a, b) => a.timeTaken - b.timeTaken;
      break;
    case "both":
      compareFunction = (a, b) =>
        a.count + a.timeTaken - (b.count + b.timeTaken);
      break;
  }
  leaderboard = leaderboard.sort(compareFunction).slice(0, 10); // top 10

  let elesArr = leaderboard.map(({ name, timeTaken, count, id }) => {
    return (
      <li className={`${userId === id ? "choosen" : ""}`}>
        <span>{name}</span>
        <span>{count}</span>
        <span>{timeTaken}</span>
      </li>
    );
  });
  return (
    <div className="leaderboard">
      <img className="lb-icon" src={lbIcon} />
      <div className="leaderboard-sort">
        <span>sort by</span>
        <button onClick={() => setSortBy("rolls")}>rolls</button>
        <button onClick={() => setSortBy("time")}>time</button>
        <button onClick={() => setSortBy("both")}>best of both!</button>
      </div>
      <ol className="grid">
        <li class="false">
          <span>Name</span>
          <span>Rolls</span>
          <span>Time</span>
        </li>
        {elesArr}
      </ol>
    </div>
  );
}
