import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemon } from '../features/pokemonSlice';
import PokemonCard from '../components/PokemonCard';
import TeamMenu from '../components/TeamMenu';
import {LIMIT, NUM_POKEMON} from '../features/pokemonSlice';
import Spinner from '../components/Spinner';
import NavBar from '../components/NavBar';

export default function PokemonListpage() {
  const [offset, setOffset] = useState(0);
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemon.pokemon);
  const status = useSelector((state) => state.pokemon.status);

  // useEffect(() => {
  //   //on initial state (idle) will call fetchpokemon
  //   if (status === "idle") {
  //     dispatch(fetchPokemon(0));
  //   }
  // }, [status, dispatch]);

  useEffect(() => {
      dispatch(fetchPokemon(offset));
  }, []);

  useEffect(() => {
    dispatch(fetchPokemon(offset));
  }, [offset]);

  if (status === "loading") {
    return (
      <div>
        <NavBar />
        <div className='main-container'>
          <TeamMenu />
          <div>
            <Spinner />
          </div>
        </div>
      </div>);
  } else if (status === "failed") {
    return (
    <div>
      <NavBar />
      <h1>Error Loading Pokemon</h1>
    </div>);
  } else {
    return (
      <div>
        <NavBar />
        <div className='main-container'>
          <TeamMenu />
          <div>
            <div className='button-container'>
              <button className='page-button' onClick={() => {
                  setOffset(offset - LIMIT);
                  if (offset <= 0) {
                    setOffset(NUM_POKEMON - LIMIT);
                  }
              }}>Previous Page</button>
              <button className='page-button' onClick={() => {
                  setOffset(offset + LIMIT);
                  if (offset >= NUM_POKEMON - LIMIT) {
                    setOffset(0);
                  }
              }}>Next Page</button>
            </div>
            
            <div className='card-container'>
              {pokemon.map((pokemon, index) => (

                <PokemonCard 
                  key={index}
                  pokemon={pokemon}
                />
                
              ))}
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}
