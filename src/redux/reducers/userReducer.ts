import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'comic',
    initialState: {
        name: 'Nome Qualquer',
        desc: 'Descrição Qualquer'
    },
    reducers: {
        setName: (state, action)=>{
            state.name = action.payload;
        },
        setDesc: (state, action) =>{
            state.desc = action.payload;
        }
    }
});

export const { setName, setDesc } = slice.actions;
export default slice.reducer;