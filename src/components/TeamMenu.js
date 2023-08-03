import React from 'react'
import { useSelector } from 'react-redux';
import TeamCard from './TeamCard';

//Component container for displaying team cards
export default function TeamMenu() {
  
  const team = useSelector((state) => state.pokemon.team);
  const status = useSelector((state) => state.pokemon.status);

  //Don't display team cards while loading
  if (status === "loading") {
    return (<div className='team-container'>
      <h1>Your Team</h1>
    </div>);
  } else if (status === "failed") {
    return <div className='team-container'>Error Loading Pokemon</div>;
  } else {
    //render team if there are pokemon in it
    if(team.length !== 0) {
      return (
        <div className='team-container'>
          <h1>Your Team</h1>
          {team.map((pokemon, index) =>
            <TeamCard
              key={index}
              pokemon={pokemon}
            />
          )}
        </div>
      )
    }
    //if no pokemon in team give user advice on how to start
    else {
      return (
        <div className='team-container'>
          <h1>Click + to Add to Team</h1>
        </div>
      )
    }
  }
}
