import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Footer from "./Footer";
import { nanoid } from "nanoid";

export default function Suggestions({ userName, setUserName }) {
  const pantryID = "319f2108-7202-4669-9979-bfbd309ebdd7";
  const pantryBasketName = "Feedbacks";
  const textareaRef = useRef();

  // const [gaveFeedback, setGaveFeedback] = useState(() =>
  //   localStorage.getItem("TenziesFeedback")
  //     ? localStorage.getItem("TenziesFeedback")
  //     : false
  // );

  function setterFunc(e, setUserName) {
    e.preventDefault();
    let username = e.target.userName.value;
    username = username !== "" ? username : "Guest";
    setUserName(username);
    // localStorage.setItem("tenziesName", username);
  }
  function sendAnonymousSuggestion(e) {
    e.preventDefault();
    let val = e.target.suggestionTextArea.value;
    if (val === "") return;

    let newid = nanoid();
    var data = JSON.stringify({
      [newid]: val,
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

    //localStorage.setItem("TenziesFeedback", true);
    textareaRef.current.value = "";
    textareaRef.current.placeholder = "Thankyou for your feedback❤️!";
  }

  const FirstTime = () => {
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
            maxLength="15"
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
  const WelcomeBack = () => {
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

      <h3 style={{ fontSize: "1.4rem", textAlign: "left", marginTop: "10px" }}>
        send an annonymous Feedback!📩{" "}
      </h3>
      <form onSubmit={sendAnonymousSuggestion}>
        <textarea
          ref={textareaRef}
          name="suggestionTextArea"
          className="suggestion-textarea"
        />
        <button className="send-suggestion">send</button>
      </form>
      <Footer />
    </div>
  );
}
