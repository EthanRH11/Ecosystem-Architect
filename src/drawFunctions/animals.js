import store from "../stateManager/store";
import { Bear, Deer, Rabbit } from "../models/Species";
import { addBear, updateBear } from "../stateManager/slices/animalSlices";
import { Vector } from "../models/Movement";

// initial setup
export function setUpAnimal() {
    const animals = store.getState().animals;

    if (animals.bears.length === 0) {
        store.dispatch(addBear(new Bear({ population: 3, position: new Vector(0, 100) }).toObject()));
        store.dispatch(addBear(new Bear({ population: 6, position: new Vector(150, 100)}).toObject()));
        store.dispatch(addBear(new Bear({ population: 10, position: new Vector(300, 100)}).toObject()));
    }
}

// draw all animals. Called every frame in draw()
export function drawAnimal(p, img) {
    if (!img) return;

    const animals = store.getState().animals;

    // Draw animals based on their size + position
    animals.bears.forEach(bear => {
        p.image(img, bear.position.x, bear.position.y, img.width * (bear.population / 10), img.height * (bear.population / 10));
    });
}

// update the state of all animals. Called every frame in draw()
export function updateAnimal(p, img) {
    const bears = store.getState().animals.bears;

    // Rehydrate all objects in the store, and call updatePosition() method.
    const newBears = bears.map(bearObj => {
        const newBear = new Bear(bearObj);
        newBear.updatePosition(p.windowWidth, p.windowHeight, img.width, img.height);
        return newBear.toObject();
    });
    console.log(newBears);

    store.dispatch(updateBear(newBears));
}