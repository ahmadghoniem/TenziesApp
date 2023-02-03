import { useEffect, useState } from "react";

export default function Suggestions({ userName, setUserName }) {
  const [gaveFeedback, setGaveFeedback] = useState(() =>
    localStorage.getItem("TenziesFeedback")
      ? localStorage.getItem("TenziesFeedback")
      : false
  );

  function setterFunc(e, setUserName) {
    e.preventDefault();
    let username = e.target.userName.value;
    username = username !== "" ? username : "Guest";
    setUserName(username);
    localStorage.setItem("tenziesName", username);
  }
  function sendAnonymousSuggestion(e) {
    e.preventDefault();
    let val = e.target.suggestionTextArea.value;

    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE) {
        console.log(req.responseText);
      }
    };

    req.open("POST", "https://api.jsonbin.io/v3/b", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader(
      "X-Access-Key",
      "$2b$10$0r6MoV0YrfDFrgMovTarVeWTY4kIuI4lii9cFnPM4JaRfN4a8ii9."
    );
    req.send(`{"feedback": "${val}"}`);
    localStorage.setItem("TenziesFeedback", true);
    setGaveFeedback(true);
  }
  let FirstTime = () => {
    return (
      <>
        <h2>
          Hello there👋 <br />
          <span>what's your name?</span>
        </h2>
        <form onSubmit={(e) => setterFunc(e, setUserName)}>
          <input
            type="text"
            defaultValue={userName}
            name="userName"
            maxlength="15"
            placeholder="pick something unique!"
          />
          <button> save </button>
        </form>
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
          Welcome
          <br /> {userName} 👋!
        </h2>
      </>
    );
  };
  return (
    <div className="Suggestions-board">
      {userName === "Guest" ? <FirstTime /> : <WelcomeBack />}
      {!gaveFeedback ? (
        <>
          {" "}
          <h2>send an annonymous Feedback!📩 </h2>
          <form onSubmit={sendAnonymousSuggestion}>
            <textarea
              name="suggestionTextArea"
              className="suggestion-textarea"
            />
            <button>send</button>
          </form>
        </>
      ) : (
        <>
          <h1>thank you for your feedback!</h1>
        </>
      )}
    </div>
  );
}
