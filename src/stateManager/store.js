import { configureStore } from '@reduxjs/toolkit';
import animalSliceReducer from './slices/animalSlices'

const store = configureStore({
    reducer: {
        animals: animalSliceReducer,
    }
});

export default store;