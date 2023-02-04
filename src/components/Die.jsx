export default function Die({
  setheldDice,
  index,
  value,
  heldDice,
  count,
  tenzies,
}) {
  const styles = {
    backgroundColor: heldDice[index] != undefined ? "#59e391" : "#fff",
  };

  function fixDice(e, index) {
    if (count === 0 || tenzies) return; // don't hold the dice unless the user started the game and don't make him be able to select the dies after he wins
    // else it will trigger the useEffect's function and will his name to the leaderboards again!
    setheldDice(function (prevState) {
      prevState[index] = prevState[index] !== undefined ? undefined : value;
      return [...prevState];
    });
  }
  return (
    <div className="dice" style={styles} onClick={(e) => fixDice(e, index)}>
      {value}
    </div>
  );
}
