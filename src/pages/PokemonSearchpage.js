import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar';
import TeamMenu from '../components/TeamMenu';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/Spinner';
import { fetchAllPokemon, fetchPokemonFiltered } from '../features/pokemonSlice';
import PokemonCard from '../components/PokemonCard';

//all the types of pokemon (This will not change, at least for 3-5 years)
const TYPES = 
    ['normal','fire','water','grass','electric',
    'ice','fighting','poison','ground','flying',
    'psychic','bug','rock','ghost','dark',
    'dragon','steel','fairy'];

export default function PokemonSearchpage() {
    const dispatch = useDispatch();
    const status = useSelector((state) => state.pokemon.status);
    const pokemon = useSelector((state) => state.pokemon.pokemon);

    const [searchType, setSearchType] = useState("none");
    const [firstType, setFirstType] = useState(TYPES[0]);
    const [searchQuery, setSearchQuery] = useState("");

    //fetches a different set of pokemon depending on the search type
    useEffect(() => {
        if(searchType === "type") {
            dispatch(fetchPokemonFiltered(firstType));
        } else if(searchType === "search") {
            dispatch(fetchAllPokemon());
        }
    }, [dispatch, searchType, firstType]);


    //Functions for handling changes in the search elements
    const handleFirstTypeChange = (event) => {
        setFirstType(event.target.value);
    }
    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    }

    //Function for changing the search type to load differet data
    const changeSearchType = (event) => {
        setSearchType("none");
        setSearchType(event.target.value);
    }

    //conditional rendering based on the search type
    const renderCards = () => {
        if(searchType === "type") {  
            return (<div className='card-container'>
            {pokemon.map((pokemon,index) => {
                if(pokemon.pokemon) {
                    return (
                        <PokemonCard
                            key={index}
                            pokemon={pokemon.pokemon}
                        />
                    );
                }
            })}
            </div>);
        } else if (searchType === "search" && searchQuery.length > 0) {
            return (<div className='card-container'>
            {pokemon.map((pokemon,index) => {
                //filters out pokemon based on the search query
                if(pokemon.name?.includes(searchQuery)) {
                    return (
                        <PokemonCard
                            key={index}
                            pokemon={pokemon}
                        />
                    );   
                }
            })}
            </div>);
        }
        //condition for no search type or an empty searchQuery string
        else {
            return (
                <div className='card-container'>
                    <h1 className='text-with-background'>Enter a Search Query and Start Catching Pokemon!</h1>
                </div>
            )
        }
    }

    if(status === "loading") {
        return (
            <div>
                <NavBar />
                <div className='main-container'>
                    <TeamMenu />
                    <Spinner />
                </div>
            </div>
        );
    } else if (status === 'failed') {
        return  (
            <div>
              <NavBar />
              <div className='main-container'>
                <TeamMenu />
                <h1 className='error'>Error loading Pokemon</h1>
              </div> 
            </div>);
    //primary working page
    } else {
        return (
            <div>
                <NavBar />
                <div className='main-container'>
                    <TeamMenu />
                    <div>
                        <div className='search-container'>
                            <label htmlFor="first-type">Search By Type:</label>
                            <select value={firstType} name="first-type" id="first-type" onChange={handleFirstTypeChange}>
                                {TYPES.map((type, index) => {
                                    return (<option key={index} value={type}>{type}</option>);
                                })}
                            </select>
                            <button className='search-page-button' type="button" value="type" onClick={changeSearchType}>Search</button>
                            <label htmlFor="search">Search By Name:</label>
                            <input type="text" name="search" id="search" placeholder="Enter Pokemon Name"
                            onChange={handleInputChange}></input>
                            <button className='search-page-button' type="button" value="search" onClick={changeSearchType}>Search</button>
                        </div>
                        {renderCards()}
                    </div>
                </div>
            </div>
        );
    }
}
