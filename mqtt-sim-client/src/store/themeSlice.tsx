import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        value: 'dark'
    },
    reducers: {
        setTheme: (state, action) => {
            state.value = action.payload;
        },
        resetTheme: (state) => {
            state.value = 'dark';
        },
    }
});

export const { setTheme, resetTheme } = themeSlice.actions;

export default themeSlice.reducer;