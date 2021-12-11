import axios from "axios";
import React, { useState } from "react";
import "./style.css";

export default function Match({ game }) {
  const [resOfFirst, setResOfFirst] = useState(null);
  const [resOfDraw, setResOfDraw] = useState(null);
  const [resOfSecond, setResOfSecond] = useState(null);
  const onGambling = async (e) => {
    let gamblerId = JSON.parse(localStorage.getItem("userId"));
    console.log("userr", gamblerId);
    //check if user already gambled
    const response = await axios.get(
      "https://footballback-end.herokuapp.com/api/matches/match/" + game.key
    );
    let match = response.data;
    const arr = match.gamblingUsers.filter((user) => user == gamblerId);
    //if yes return
    if (arr.length > 0) {
      return;
    }

    //if not add user to gamble array
    let gambler = { userId: gamblerId, userChoice: e.target.id };
    match.gamblingUsers.push(gamblerId);
    //update choice
    if (e.target.id === "1") {
      match.firstTeam += 1;
    } else if (e.target.id === "2") {
      match.secondTeam += 1;
    } else match.draw += 1;
    console.log(match._id);
    const updatedMatch = await axios.put(
      "https://footballback-end.herokuapp.com/api/matches/updateMatch/" + match._id,
      {
        match: match,
      }
    );

    console.log("updatematch", updatedMatch);
    //calulate gamblers

    const results = match.firstTeam + match.draw + match.secondTeam;
    console.log(match.firstTeam, results);
    setResOfFirst(((match.firstTeam / results) * 100).toFixed(3)+"%");
    setResOfDraw(((match.draw / results) * 100).toFixed(3)+"%");
    setResOfSecond(((match.secondTeam / results) * 100).toFixed(3)+"%");
  };

  return (
    <div className="matches-container" key={new Date()}>
      {game.homeTeam + " VS " + game.awayTeam}
      <p>{game.competition}</p>
      <p>Round: {game.matchday}</p>
      <input
        disabled
        type="datetime-local"
        value={game.date.substring(0, game.date.length - 1)}
      />
      <div className="gambling-container">
        <div>
          <span id="1" onClick={onGambling}>
            1
          </span>
          {resOfFirst && <span className='resultsOf'>{resOfFirst}</span>}
        </div>
        <div>
          <span id="x" onClick={onGambling}>
            x
          </span>
          {resOfDraw &&<span className='resultsOf'>{resOfDraw}</span>}
        </div>
        <div>
          <span id="2" onClick={onGambling}>
            2
          </span>
          {resOfSecond &&<span className='resultsOf'>{resOfSecond}</span>}
        </div>
      </div>
    </div>
  );
}
