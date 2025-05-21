import Species from "./Species";

class Bear extends Species {
    constructor({
        id = "000001",
        name = "Bear",
        population = 100,
        birthRate = 0.5,
        deathRate = 0.01,
        dietType = "carnivore",
        energyValue = 15,
        energyNeeds = 20,
        movementSpeed = 4,
        size = 10,
        color = "#8B4513"
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

        this.predators = [wolves];
        this.prey = [deer, rabbits, squirrels];
        this.temperatureRange = {
            min: -30,
            max: 30,
            optimal: 10
        };
        this.hibernation = {
            start: "November",
            end: "March",
            duration: 4 // months
        };
        this.hibernationActive = false;
    }
};
