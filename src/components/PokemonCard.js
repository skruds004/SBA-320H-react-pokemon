import React from 'react'

export default function PokemonCard({pokemon}) {
  return (
    <div className="" key={pokemon.name}>
      <h3>{pokemon.name.charAt(0).toUpperCase()}{pokemon.name.slice(1)}</h3>
      <img src={"https://img.pokemondb.net/artwork/large/" + pokemon.name + ".jpg"}></img>
      <button>+</button>
    </div>
  )
}
