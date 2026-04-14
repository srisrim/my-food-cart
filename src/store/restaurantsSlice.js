import { createSlice } from "@reduxjs/toolkit";

const restaurantsSlice = createSlice({
    name: 'restaurants',
    initialState: {
        list: [],
        loading: false,
        error: null
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setAllRestaurants: (state, action) => {
            state.list = action.payload;
        }
    }
})

export const {setLoading, setAllRestaurants} = restaurantsSlice.actions;

export default restaurantsSlice.reducer;