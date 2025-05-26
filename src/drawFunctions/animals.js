import store from "../stateManager/store";
import { Bear, Deer, Rabbit } from "../models/Species";
import { addBear, addDeer, removeBear, removeDeer } from "../stateManager/slices/animalSlices";

function drawAnimal() {
    store.dispatch(addBear(new Bear().toObject()));
    console.log(store.getState());
}

export default drawAnimal;