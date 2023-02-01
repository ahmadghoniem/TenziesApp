export default function Suggestions({ userName, setUserName }) {
  function setUN(e, setUserName) {
    let name = document.querySelector("[name='userName']").value;
    setUserName(name);
    localStorage.setItem("tenziesName", name);
  }
  function sendAnonymousSuggestion(e) {
    e.preventDefault();
  }
  let FirstTime = () => {
    return (
      <>
        <h2>
          Hello there👋 <br />
          <span>what's your name?</span>
        </h2>
        <input type="text" name="userName" />
        <button onClick={(e) => setUN(e, setUserName)}> save </button>
        <p className="name-info">
          we only need it to be able to add it to the leaderboards
          <small> (if you made it!)</small>
        </p>
      </>
    );
  };
  let WelcomeBack = () => {
    return (
      <>
        <h2>
          Welcome {userName} 👋! <br />
        </h2>
      </>
    );
  };
  return (
    <div className="Suggestions-board">
      {userName === undefined ? <FirstTime /> : <WelcomeBack />}

      <h2>send an annonymous suggestion!📩 </h2>
      <textarea className="suggestion-textarea" />
      <button onClick={sendAnonymousSuggestion}>send</button>
    </div>
  );
}
