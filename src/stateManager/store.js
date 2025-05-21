import { configureStore } from '@reduxjs/toolkit';
import animalSlice from './slices/animalSlices'

const store = configureStore({
    reducer: {
        animals: animalSlice,
    }
});

export default store;