import React from 'react'
import { addToTeam, fetchPokemonByName, setPokemon } from '../features/pokemonSlice'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';



//Component for displaying pokemon
export default function PokemonCard({pokemon}) {
  
  const dispatch = useDispatch();

  //will not create cards while fetching
  if(pokemon.url) {
    //extract the pokemon_id from the pokemon's url
    //this id is used to get the pokemon's image
    let pokemon_url = pokemon.url.split('/');
    pokemon_url.pop();
    const pokemon_id = pokemon_url.pop();

    //const pokemonData = useSelector((state) => state.pokemon.pokemonData);


    return (
      <div className="pokemon-card" key={pokemon.name}>
        {/* To Be Implemented (Pokedex styling)
         <div className='pokedex-circle'></div> */}
        <h3>{pokemon.name.charAt(0).toUpperCase()}{pokemon.name.slice(1)}</h3>
        <div className='image-container'>
          <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+ pokemon_id + ".png"} alt={pokemon.name + " is not registered on this pokedex"}></img>
        </div>
        <Link to={"/pokeinfo/" + pokemon.name} /*state={{poke: pokemon}}*/ onClick={() =>
        {
          dispatch(setPokemon(pokemon));
          dispatch(fetchPokemonByName(pokemon.name));
        }}>Pokemon Info</Link>
        <button className="add-button" onClick={() => {
          dispatch(addToTeam(pokemon))}}>
        +</button>
      </div>
    )
  }
}
