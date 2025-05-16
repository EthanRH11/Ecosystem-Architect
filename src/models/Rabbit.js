import Species from './Species.js';

class Rabbit extends Species {
    constructor({
        id = "001001",
        name = "Rabbit",
        population = 100,
        birthRate = 0.7,
        deathRate = 0.15,
        dietType = "herbivore",
        energyValue = 3,
        energyNeeds = 6,
        movementSpeed = 4,
        size = 1,
        color = "#A52A2A"
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

        this.predators = [foxes, hawks, snakes];
        this.prey = [];
        this.temperatureRange = {
            min: -20,
            max: 30,
            optimal: 15
        };
    }
}

export default Rabbit;
