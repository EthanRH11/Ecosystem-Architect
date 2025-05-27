import store from "../stateManager/store";
import { Bear, Deer, Rabbit } from "../models/Species";
import { addBear, addDeer, removeBear, removeDeer } from "../stateManager/slices/animalSlices";

function drawAnimal(p, img) {
    if (!img) return;

    const animals = store.getState().animals;

    if (animals.bears.length === 0) {
        store.dispatch(addBear(new Bear().toObject()));
        store.dispatch(addBear(new Bear().toObject()));
        store.dispatch(addBear(new Bear().toObject()));
    }

    let x = 0;
    let y = 100;

    animals.bears.forEach(element => {
        p.image(img, x, y);
        x += 150;
    });
}

export default drawAnimal;