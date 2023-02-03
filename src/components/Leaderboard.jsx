import { useState } from "react";
import lbIcon from "../leaderboardIcon.svg";
export default function Leaderboard({ leaderboard, userId }) {
  const [sortBy, setSortBy] = useState("rolls"); // default is to sort by count
  switch (sortBy) {
    case "rolls":
      leaderboard = leaderboard.sort((a, b) => a.count - b.count);
      break;
    case "time":
      leaderboard = leaderboard.sort((a, b) => a.timeTaken - b.timeTaken);
      break;
    case "both":
      leaderboard = leaderboard.sort(
        (a, b) => a.count + a.timeTaken - (b.count + b.timeTaken)
      );
      break;
  }
  leaderboard = leaderboard.slice(0, 10); // top 10

  let elesArr = leaderboard.map(({ name, timeTaken, count, id }) => {
    return (
      <li className={` ${userId === id && "choosen"}`}>
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
        <button onClick={() => setSortBy("both")}>both!</button>
      </div>
      <ol className="leaderboard-list">{elesArr}</ol>
    </div>
  );
}
