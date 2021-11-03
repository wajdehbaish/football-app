import React, { useEffect } from "react";
import axios from "axios";
import "./style.css";

const Home = () => {
  const [selected, setSelected] = React.useState("CL");
  const [listOfMatches, setListOfMatches] = React.useState([]);
  const [originalMatches, setOriginalMatches] = React.useState([]);

  let apiurl = `https://api.football-data.org/v2/competitions/${selected}/matches`;

  useEffect(() => {
    getMatches();
  }, [selected]);

  const getMatches = async () => {
    const getMatches = await axios.get(apiurl, {
      headers: { "X-Auth-Token": "ace2a2eb816644f0bb21233fb8ae3d3e" },
    });
    setListOfMatches(getMatches.data.matches);
   setOriginalMatches(getMatches.data.matches);
    console.log("getMatches", getMatches.data.matches);
  };

  const handleOnChange = (e) => {
    setSelected(e.target.value);
  };

  const hanldeTeamSearch=(e)=>{
    let searched=e.target.value.toLowerCase();
    if(searched === ''){ 
      
      setListOfMatches(originalMatches)
      return 
    }

   
    console.log(searched);
    let filltered=[...listOfMatches].filter(match=>{
      if(match.awayTeam.name.toLowerCase().includes(searched) || match.homeTeam.name.toLowerCase().includes(searched))
             return match 
             
    })
    setListOfMatches(filltered);
  }

  return (
    <div className='league-select'>
      <input name='search' type='text' placeholder='search a team' onChange={hanldeTeamSearch} />
      <select id="select-league" onChange={handleOnChange}>
        <option value="CL">Champions League</option>
        <option value="SA">Seria A</option>
        <option value="PL">premier league</option>
      </select>
      <div className="home-container">
      
      {listOfMatches.length>0
        ? listOfMatches.map((listOfMatch) => {
            return (
              <div className="match-container" key={listOfMatch.id}>
                {listOfMatch.homeTeam.name + " VS " + listOfMatch.awayTeam.name}
                <div className='results'>
                FullTime: {listOfMatch.score.fullTime.homeTeam + "-" + listOfMatch.score.fullTime.awayTeam}
                </div>
                <input
                  disabled
                  type="datetime-local"
                  value={listOfMatch.utcDate.substring(
                    0,
                    listOfMatch.utcDate.length - 1
                  )}
                />
              </div>
            );
          })
        : ""}
    </div>
    </div>
   
  );
};
export default Home;
