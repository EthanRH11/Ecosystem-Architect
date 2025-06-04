import store from "../stateManager/store";
import { Bear, Deer, Rabbit } from "../models/Species";
import { addBear, addDeer, removeBear, removeDeer } from "../stateManager/slices/animalSlices";

export function setUpAnimal() {
    const animals = store.getState().animals;

    if (animals.bears.length === 0) {
        store.dispatch(addBear(new Bear({population: 3, x: 0, y: 100}).toObject()));
        store.dispatch(addBear(new Bear({population: 6, x: 150, y: 100}).toObject()));
        store.dispatch(addBear(new Bear({population: 10, x: 300, y: 100}).toObject()));
    }
}

export function drawAnimal(p, img) {
    if (!img) return;

    const animals = store.getState().animals;

    animals.bears.forEach(bear => {
        p.image(img, bear.x, bear.y, img.width * (bear.population / 10), img.height * (bear.population / 10));
    });
}

// TODO: implement movement.
export function updateAnimal() {

}