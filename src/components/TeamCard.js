import React from 'react'
import { useDispatch } from 'react-redux';
import { Link} from 'react-router-dom'
import { fetchPokemonByName, removeFromTeam, setPokemon } from '../features/pokemonSlice';

//Component that is a smaller version of the PokemonCard Component for the TeamMenu component
export default function TeamCard({pokemon}) {
    const dispatch = useDispatch();

    //extract the pokemon_id from the pokemon's url
    //this id is used to get the pokemon's image
    let pokemon_url = pokemon.url.split('/');
    pokemon_url.pop();
    const pokemon_id = pokemon_url.pop();

    //truncating the name to keep it from being too long
    let truncatedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    truncatedName = truncatedName.split('-')[0];

    return (
        <div className="team-card" key={pokemon.name}>
        {/* <div className='pokedex-circle'></div> */}
        <div className='team-card-title-container'>
        <h3 className='team-card-title'>{truncatedName}</h3>
        <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+ pokemon_id + ".png"} alt="No Image"></img>
        </div>
        <Link to={"/pokeinfo/" + pokemon.name} onClick={() =>
        {
            dispatch(setPokemon(pokemon));
            dispatch(fetchPokemonByName(pokemon.name));
        }}>Pokemon Info</Link>
        <button className="add-button" onClick={() => {
            dispatch(removeFromTeam(pokemon))}}>
        -</button>
        </div>
    )
}
