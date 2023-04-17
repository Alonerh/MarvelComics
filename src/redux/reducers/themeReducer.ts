import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'theme',
    initialState: {
        status: 'light'
    },
    reducers: {
        setStatus: (prevState, action)=>{
            prevState.status = action.payload
        }
    }
});

export const { setStatus } = slice.actions;

export default slice.reducer;