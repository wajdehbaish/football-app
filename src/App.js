import './App.css';
import React, {  useEffect } from "react";
import Videos from './components/vidoes/index';
import Games from './components/games/index';
import Home from './components/home/index'
import Standing from './components/standing/index'
import Register from './components/login/Register';



import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios';
import Login from './components/login/Login';

const hightlightsApi="https://www.scorebat.com/video-api/v3/"
const gamesApi= "https://footballback-end.herokuapp.com/api/matches"


function App() {
  const [soccerVideos,setSoccerVidoes]=React.useState([]);
  const [games,setGames]=React.useState([]);
const getTodayGames=async()=>{
 const todayGames = await axios.get(gamesApi,{headers:{"X-Auth-Token":"ace2a2eb816644f0bb21233fb8ae3d3e"}})
 console.log("gamesfortofay",todayGames);
 setGames(todayGames.data)

}
 
const getVidoes=async()=>{
    const Vidoes=await axios.get(hightlightsApi)
    setSoccerVidoes(Vidoes.data.response);
   
  }
  console.log(games);
  useEffect(()=>{
    getTodayGames()
getVidoes();
  },[])

  return (
   
    <Router>
    <div className="mian-main-main">
      <nav>
       <img src='https://images.unsplash.com/photo-1589467785902-054ed88148d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80'
        alt='picture' width='45' height='45' />

            <Link className='link' to="/Standing">Standing</Link>

            <Link className='link' to="/Leagues">Leagues</Link>
        
            <Link className='link' to="/hightlights">Highlights</Link>
        
            <Link className='link' to="/Games">MatchDay</Link>
       
            

            <Link className='link' to="/Login">Login</Link>
        
      </nav>

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/hightlights">
        <Videos soccerVideos={soccerVideos} />
        </Route>
        <Route path="/Games">
     <Games games={games}/>
        </Route>
        <Route path="/Leagues">
          <Home />
          
        </Route>
        <Route path="/Standing">
          <Standing />
          
        </Route>
        
        <Route path="/Login">
          <Login />
          
        </Route>
        <Route path="/Register">
          <Register />
          
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
