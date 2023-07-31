import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { fetchPokemonByName } from '../features/pokemonSlice';
import { useState } from 'react';
import TeamMenu from '../components/TeamMenu';



export default function PokemonDescriptionpage() {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemon.pokemonData);
  const status = useSelector((state) => state.pokemon.status);

  
  useEffect(() => {
    dispatch(fetchPokemonByName(pokemon.name));
  }, []);

  useCallback(() => {
    dispatch(fetchPokemonByName(pokemon.name));
    console.log('fetching');
  }, [pokemon]);

  if (status === "loading") {
    return <div>Loading...</div>;
  } else if (status === "failed") {
    return <div>Error loading products</div>;
  } else {
    return (
      
      <div className='main-container'>
        <TeamMenu />
        {pokemon.name}
        {pokemon.weight}
        <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemon.id + ".png"} alt="hmm"></img>
      </div>
    );
  }
  
}
