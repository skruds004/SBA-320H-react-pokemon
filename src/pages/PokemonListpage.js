import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useLocation } from 'react-router-dom';
import { addToTeam, fetchPokemon, removeFromTeam } from '../features/pokemonSlice';

export default function PokemonListpage() {
  const location = useLocation();
  const propsData = location.state;
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemon.pokemon);
  const status = useSelector((state) => state.pokemon.status);

  useEffect(() => {
    //on initial state (idle) will call fetchproducts
    if (status === "idle") {
      dispatch(fetchPokemon(propsData));
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  } else if (status === "failed") {
    return <div>Error loading products</div>;
  }

  return (
    <div>
      {pokemon.map(pokemon => (

        <div key={pokemon.name}>
          <h3>{pokemon.name.charAt(0).toUpperCase()}{pokemon.name.slice(1)}</h3>
          <button>+</button>
        </div>
        
      ))}
    </div>
  )
}
