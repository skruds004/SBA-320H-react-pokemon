import React from 'react'
import { useSelector } from 'react-redux';
import { removeFromTeam } from '../features/pokemonSlice';
import TeamCard from './TeamCard';
import PokemonCard from './PokemonCard';

export default function TeamMenu() {
  
  const team = useSelector((state) => state.pokemon.team);
  const status = useSelector((state) => state.pokemon.status);
  console.log(team);

  if (status === "loading") {
    return (<div className='team-container'>
      <h1>Your Team</h1>
    </div>);
  } else if (status === "failed") {
    return <div className='team-container'>Error Loading Pokemon</div>;
  } else {
    //render team if there are pokemon in it
    if(team.length != 0) {
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
