import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {fetchPokemonByName } from '../features/pokemonSlice';
import TeamMenu from '../components/TeamMenu';
import NavBar from '../components/NavBar';
import Spinner from '../components/Spinner';



export default function PokemonDescriptionpage() {
  
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemon.pokemonData);
  const status = useSelector((state) => state.pokemon.status);

  useEffect(() => {
    if(pokemon) {
      dispatch(fetchPokemonByName(pokemon.name));
    }
  }, [dispatch]);

  useCallback(() => {
    if(pokemon) {
      dispatch(fetchPokemonByName(pokemon.name));
    }
  }, [dispatch, pokemon]);

  const pokeName = pokemon?.name.charAt(0).toUpperCase() + pokemon?.name.slice(1);

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
  } else if (status === "failed" || status === "idle") {
    return  (
      <div>
        <NavBar />
        <div className='main-container'>
          <TeamMenu />
          <h1 className='error'>Error loading Pokemon</h1>
        </div>
        
      </div>);
  } else {
    return (
      <div>
        <NavBar />
        <div className='main-container'>
          <TeamMenu />
          <div>
            <div className='info-container'>
            <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemon.id + ".png"}
             alt={pokeName + "'s image is not registered in this pokedex"}></img>
            <h1>{pokeName}</h1>
            <h3>Types: 
            {pokemon?.types.map(type => {
              return (
                <span> {type.type.name.charAt(0).toUpperCase()}{type.type.name.slice(1)}</span>
              );
            })}
            </h3>
            <h3>Abilities: 
            {pokemon.abilities.map(ability => {
              return (
                <span> {ability.ability.name.charAt(0).toUpperCase()}{ability.ability.name.slice(1)}</span>
              );
            })}
            </h3>
            

            <table>
              <tr>
                <th colSpan={2}>Stats</th>
              </tr>
              <tr>
                <td>HP: </td>
                <td>{pokemon.stats[0].base_stat}</td>
              </tr>
              <tr>
                <td>Attack: </td>
                <td>{pokemon.stats[1].base_stat}</td>
              </tr>
              <tr>
                <td>Defense: </td>
                <td>{pokemon.stats[2].base_stat}</td>
              </tr>
              <tr>
                <td>Sp. Atk: </td>
                <td>{pokemon.stats[3].base_stat}</td>
              </tr>
              <tr>
                <td>Sp. Def: </td>
                <td>{pokemon.stats[4].base_stat}</td>
              </tr>
              <tr>
                <td>Speed: </td>
                <td>{pokemon.stats[5].base_stat}</td>
              </tr>
            </table>

            <h4>{pokeName} weighs {pokemon.weight/10} kgs</h4>
            <h4>{pokeName} is {pokemon.height/10} meter(s) tall</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}
