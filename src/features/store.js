import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./pokemonSlice"

//redux store
export default configureStore({
    reducer: {
        pokemon: pokemonReducer,
    },
});