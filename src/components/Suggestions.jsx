import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./Footer";

export default function Suggestions({ userName, setUserName }) {
  let pantryID = "319f2108-7202-4669-9979-bfbd309ebdd7";
  let pantryBasketName = "Feedbacks";

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

    var data = JSON.stringify({
      feedback: val,
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
        <h1 style={{ marginBottom: 0 }}>
          Welcome
          <br /> {userName} 👋!
        </h1>
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
      <Footer />
    </div>
  );
}
