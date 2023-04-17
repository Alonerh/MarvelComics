import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'comic',
    initialState: {
        title: 'Nome Qualquer',
        desc: 'Descrição Qualquer'
    },
    reducers: {
        setTitle: (state, action)=>{
            state.title = action.payload;
        },
        setDesc: (state, action) =>{
            state.desc = action.payload;
        }
    }
});

export const { setTitle, setDesc } = slice.actions;
export default slice.reducer;