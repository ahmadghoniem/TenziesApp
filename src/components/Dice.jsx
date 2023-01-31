export default function Dice({
  setFixedIndecies,
  index,
  value,
  fixedIndecies,
}) {
  const styles = {
    backgroundColor: fixedIndecies[index] != undefined ? "#59e391" : "#fff",
  };

  function fixDice(e, index) {
    setFixedIndecies(function (prevState) {
      prevState[index] = prevState[index] !== undefined ? undefined : value;
      return [...prevState];
    });

    console.log(fixedIndecies);
  }
  return (
    <div className="dice" style={styles} onClick={(e) => fixDice(e, index)}>
      {value}
    </div>
  );
}
