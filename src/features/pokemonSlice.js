import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

//offset limit for pagination
export const LIMIT = 25;
//total number of pokemon
export const NUM_POKEMON = 1281;

//Thunk for fetching all the pokemon paginated
export const fetchPokemon = createAsyncThunk("pokemon/fetchPokemon", 
      async (offset) => {
            //if no offset is passed default to 0
            if(!offset) {
                  offset = 0;
            }
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`);
            return response.data;
      }
);

//Thunk for fetching all pokemon for filtering by searchQuery
export const fetchAllPokemon = createAsyncThunk("pokemon/fetchAllPokemon", 
      async () => {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${NUM_POKEMON}`);
            return response.data;
      }
);

//Thunk for fetching all pokemon of a certain type
//Future possibly implement search by abilities or other features
export const fetchPokemonFiltered = createAsyncThunk("pokemon/fetchPokemonFiltered",
      async (filter) => {
            let url = "https://pokeapi.co/api/v2/"
            console.log(filter);
            if(filter) { 
                  url += "type/" + filter;
            }
            else {
                  url += "pokemon";
            }
            const response = await axios.get(url);
            console.log(response.data.pokemon);
            return response.data.pokemon;
      }
);

//Fetch a single pokemon by its name
export const fetchPokemonByName = createAsyncThunk("pokemon/fetchPokemonByName",
      async (name) => {
            const url = "https://pokeapi.co/api/v2/pokemon/" + name;
            const response = await axios.get(url);
            console.log(response.data);
            return response.data;
      }
);

//Slice to hold all pokemon related data
const pokemonSlice = createSlice({
      name: "pokemon",
      initialState: {
            //Holds the data of big pokemon fetches
            pokemon: [],
            //Holds the data of single pokemon fetches
            pokemonData: null,
            //Holds the data of your team
            team: [],
            //Holds the status of fetching
            status: "idle",
            error: null
      },
      reducers: {
            //used to prevent errant behavior in some functions
            setPokemon: (state, action) => {
                  state.pokemonData = action.payload;
            },
            //add pokemon to your team 
            addToTeam: (state, action) => {
                  //check if you already have that pokemon
                  //official pokemon team building rules state that you may not have multiple of the same pokemon
                  const index = state.team.findIndex(
                        (poke) => poke.name === action.payload.name
                  );
                  if(state.team.length <= 5 && index === -1) { 
                        state.team.push(action.payload);
                  } 
                  //alert the user of their mistakes
                  else {
                        alert("You may only have up to 6 members in your team, and no duplicates.");
                  }
            },
            //remove pokemon from your team
            removeFromTeam: (state, action) => {
                  const index = state.team.findIndex(
                        (poke) => poke.name === action.payload.name
                  );
                  if (index !== -1) {
                        state.team.splice(index, 1);
                  }
            },
      },
      //All the fetching reducers
      extraReducers: (builder) => {
            builder
                  .addCase(fetchPokemon.pending, (state) => {
                        state.status = "loading";
                  })
                  .addCase(fetchPokemon.fulfilled, (state, action) => {
                        state.status = "succeeded";
                        state.pokemon = action.payload.results;
                  })
                  .addCase(fetchPokemon.rejected, (state, action) => {
                        state.status = "failed";
                        state.error = action.error.message;
                  })
                  .addCase(fetchAllPokemon.pending, (state) => {
                        state.status = "loading";
                  })
                  .addCase(fetchAllPokemon.fulfilled, (state, action) => {
                        state.status = "succeeded";
                        state.pokemon = action.payload.results;
                  })
                  .addCase(fetchAllPokemon.rejected, (state, action) => {
                        state.status = "failed";
                        state.error = action.error.message;
                  })
                  .addCase(fetchPokemonFiltered.pending, (state) => {
                        state.status = "loading";
                  })
                  .addCase(fetchPokemonFiltered.fulfilled, (state, action) => {
                        state.status = "succeeded";
                        state.pokemon = action.payload;
                  })
                  .addCase(fetchPokemonFiltered.rejected, (state, action) => {
                        state.status = "failed";
                        state.error = action.error.message;
                  })
                  .addCase(fetchPokemonByName.pending, (state) => {
                        state.status = "loading";
                  })
                  .addCase(fetchPokemonByName.fulfilled, (state, action) => {
                        state.status = "succeeded";
                        state.pokemonData = action.payload;
                  })
                  .addCase(fetchPokemonByName.rejected, (state, action) => {
                        state.status = "failed";
                        state.error = action.error.message;
                  })
                  
      }
});

export const {addToTeam, removeFromTeam, setPokemon} = pokemonSlice.actions;

export default pokemonSlice.reducer;