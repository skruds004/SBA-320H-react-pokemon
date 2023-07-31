import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

//offset limit for pagination
export const LIMIT = 25;
//total number of pokemon
export const NUM_POKEMON = 1281;

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

export const fetchAllPokemon = createAsyncThunk("pokemon/fetchAllPokemon", 
      async () => {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${NUM_POKEMON}`);
            return response.data;
      }
);

export const fetchPokemonFiltered = createAsyncThunk("pokemon/fetchPokemonFiltered",
      async (filters) => {
            let url = "https://pokeapi.co/api/v2/"
            console.log(filters);
            if(filters) {
                  if(filters.type) {
                        url += "type/" + filters.type;
                  }
            }
            else {
                  url += "pokemon";
            }
            const response = await axios.get(url);
            console.log(response.data);
            return response.data;
      }
);

export const fetchPokemonByName = createAsyncThunk("pokemon/fetchPokemonByName",
      async (name) => {
            const url = "https://pokeapi.co/api/v2/pokemon/" + name;
            const response = await axios.get(url);
            console.log(response.data);
            return response.data;
      }
);

const pokemonSlice = createSlice({
      name: "pokemon",
      initialState: {
            pokemon: [],
            pokemonData: null,
            team: [],
            status: "idle",
            error: null
      },
      reducers: {
            setPokemon: (state, action) => {
                  state.pokemonData = action.payload;
            },
            addToTeam: (state, action) => {
                  //check if you already have that pokemon
                  //official pokemon team building rules state that you may not have multiple of the same pokemon
                  const index = state.team.findIndex(
                        (poke) => poke.name === action.payload.name
                  );
                  if(state.team.length <= 5 && index == -1) { 
                        state.team.push(action.payload);
                  } 
                  else {
                        alert("You may only have up to 6 members in your team, and no duplicates.");
                  }
            },
            removeFromTeam: (state, action) => {
                  const index = state.team.findIndex(
                        (poke) => poke.name === action.payload.name
                  );
                  if (index !== -1) {
                        state.team.splice(index, 1);
                  }
            },
      },
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
                        state.pokemon = action.payload.results;
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