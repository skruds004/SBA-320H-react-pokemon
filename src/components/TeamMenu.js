import React from 'react'
import { useSelector } from 'react-redux';
import { removeFromTeam } from '../features/pokemonSlice';
import TeamCard from './TeamCard';
import PokemonCard from './PokemonCard';

export default function TeamMenu() {
  
  const team = useSelector((state) => state.pokemon.team);
  console.log(team);

  return (
    <div className='team-container'>
      <h1>The Team</h1>
      {team.map((pokemon, index) =>
        <TeamCard
          key={index}
          pokemon={pokemon}
        />
      )}
    </div>
  )
}
