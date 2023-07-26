import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const LIMIT = 50;

export const fetchPokemon = createAsyncThunk("pokemon/fetchPokemon", 
      async (filters) => {
            console.log(filters);
            if(filters) {
                  let url = "https://pokeapi.co/api/v2/"
                  if(filters.type) {
                        url += "type/" + filters.type;
                  }
                  else {
                        url += "pokemon";
                  }
            }
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}`);
            console.log(response.data);
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

const pokemonSlice = createSlice({
      name: "pokemon",
      initialState: {
            pokemon: [],
            team: [],
            status: "idle",
            error: null
      },
      reducers: {
            addToTeam: (state, action) => {
                  state.team.push(action.payload);
            },
            removeFromTeam: (state, action) => {
                  const index = state.team.findIndex(
                        (poke) => poke.id === action.payload.id
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
                  });
      }
});

export const {addToTeam, removeFromTeam} = pokemonSlice.actions;

export default pokemonSlice.reducer;