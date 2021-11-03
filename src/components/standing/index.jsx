import React, { useEffect } from "react";
import axios from "axios";
import "./style.css";

const Standing = () => {
  const [league, setLeague] = React.useState([]);
  const [standings, setStandings] = React.useState([]);
  const [selected, setSelected] = React.useState("1");

  let leagueApi = "https://617e599a2ff7e600174bd77f.mockapi.io/leagues";
  let standingsApi = `https://617e599a2ff7e600174bd77f.mockapi.io/leagues/${selected}/teams`;

  const getStandings = async () => {
    const standings = await axios.get(standingsApi);
    console.log("standings", standings);
    setStandings(standings.data);
  };

  const getLeagues = async () => {
    const leagues = await axios.get(leagueApi);
    console.log("leagues", leagues);
    setLeague(leagues.data);
  };
  useEffect(() => {
    getLeagues();
    getStandings();
  }, [selected]);

  const handleOnChange = (e) => {
    setSelected(e.target.value);
  };

  return (
    <div className="league-table">
      <select id="select-league" onChange={handleOnChange}>
        <option value="1">Premier league</option>
        <option value="2">La liga</option>
        <option value="3">Seria A</option>
        <option value="4">Bundesleague</option>
        <option value="5">League 1</option>
      </select>
      <div className="standings-container">
        <table>
          <tr>
            <th></th>
            <th>Team</th>
            <th>MP</th>
            <th>W</th>
            <th>L</th>
            <th>D</th>
            <th>GA</th>
            <th>GF</th>
            <th>PTS</th>
          </tr>

          {standings
            ? standings.map((teams) => {
                return (
                  <tr>
                    <td>
                      {" "}
                      <div className="standing-table">
                        <img width="50" height="50" src={teams.avatar} />
                      </div>
                    </td>
                    <td>{teams.name}</td>
                    <td>{teams.MP}</td>
                    <td>{teams.W}</td>
                    <td>{teams.L}</td>
                    <td>{teams.D}</td>
                    <td>{teams.GA}</td>
                    <td>{teams.GF}</td>
                    <td>{teams.PTS}</td>
                  </tr>
                );
              })
            : ""}
        </table>
      </div>
    </div>
  );
};

export default Standing;
