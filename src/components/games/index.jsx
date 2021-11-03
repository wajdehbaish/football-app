import React from "react";
import './style.css'
const Games=({games})=>{
    return(
        <div className='game-container' >
            {games?games.map((game)=>{
                return(
                    <div className='matches-container' key={new Date()}>                     
                        {game.homeTeam.name + " VS " + game.awayTeam.name}
                        <p>{game.competition.name}</p>
                        <p>Round: {game.matchday}</p>
                         <input disabled type='datetime-local' value={game.utcDate.substring(0,game.utcDate.length-1)}/> 
                        
                    </div>
                )
            }):''}
        </div>
    )
    

}
export default Games;