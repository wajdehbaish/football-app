import axios from "axios";
import React from "react";
import { matchPath } from "react-router";
import Match from "./Match";
import './style.css'
const Games=({games})=>{


console.log(games);


    return(
        <div className='game-container' >
            {games?games.map((game)=>{
                return(
                <Match game={game} />        
                       )
            }):''}
        </div>
    )
    

}
export default Games;