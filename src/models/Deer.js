import Species from './Species.js';

class Deer extends Species {
    constructor({
        id = "001002",
        name = "Deer",
        population = 100,
        birthRate = 0.5,
        deathRate = 0.1,
        dietType = "herbivore",
        energyValue = 5,
        energyNeeds = 8,
        movementSpeed = 3,
        size = 2,
        color = "#8B4514"
    } = {}) {
        super({
            id,
            name,
            population,
            birthRate,
            deathRate,
            dietType,
            energyValue,
            energyNeeds,
            movementSpeed,
            size,
            color
        });

        this.predators = [wolves, bears];
        this.prey = [];
        this.temperatureRange = {
            min: -20,
            max: 30,
            optimal: 15
        };
    }
}