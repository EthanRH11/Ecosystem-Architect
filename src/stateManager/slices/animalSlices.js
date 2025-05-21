import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bears: [],
    deers: []
};

const animalSlice = createSlice({
    name: 'animals',
    initialState,
    reducers: {
        addBear: (state, action) => {
            state.bears.push(action.payload);
        },

        addDeer: (state, action) => {
            state.deers.push(action.payload);
        },

        removeBear: (state, action) => {
            state.bears = state.bears.filter(bear => bear.id !== action.payload);
        },

        removeDeer: (state, action) => {
            state.deers = state.deers.filter(bear => bear.id !== action.payload);
        }
    }
});

export const {addBear, addDeer, removeBear, removeDeer} = animalSlice.actions
export default animalSlice