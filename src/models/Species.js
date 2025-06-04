import { Vector } from "./Movement";

class Species {
    constructor(obj = {}) {

        // id = Math.random().toString(36).substring(2, 9),
        // name = 'Unnamed Species',
        // population = 10,
        // birthRate = 0.1,
        // deathRate = 0.05,
        // dietType = 'herbivore', //Options: 'producer', 'herbivore', 'carnivore'
        // energyValue = 10, //How much energy it provides when eaten
        // energyNeeds = 5, //How much energy it needs to survive
        // velocity = new Vector(1, 0), //how fast it moves in the enviorment
        // size = 1,   //relative size
        // // initial position
        // position = new Vector(0, 0)

        this.id = obj.id || Math.random().toString(36).substring(2, 9);
        this.name = obj.name || 'Unnamed Species';

        this.population = obj.population ?? 10;
        this.birthRate = obj.birthRate ?? 0.1;
        this.deathRate = obj.deathRate ?? 0.05;
        this.populationHistory = obj.populationHistory || [this.population];

        this.dietType = obj.dietType || 'herbivore', //Options: 'producer', 'herbivore', 'carnivore';
            this.predators = obj.predators || [];
        this.prey = obj.prey || [];

        this.energyValue = obj.energyValue ?? 10; //How much energy it provides when eaten
        this.energyNeeds = obj.energyNeeds ?? 5; //How much energy it needs to survive

        //how fast it moves in the enviorment
        this.velocity = obj.velocity instanceof Vector ? obj.velocity : new Vector(obj.velocity?.x ?? 1, obj.velocity?.y ?? 0);
        this.size = obj.size ?? 1; // relative size

        this.temperatureRange = obj.temperatureRange ||
        {
            min: 0,
            max: 40,
            optimal: 25
        };

        this.position = obj.position instanceof Vector ? obj.position : new Vector(obj.position?.x ?? 0, obj.position?.y ?? 0);;
    }

    updatePosition(windowWidth, windowHeight, imageWidth, imageHeight) {
        const nextX = this.position.x + this.velocity.x;
        const nextY = this.position.y + this.velocity.y;
        const scaledWidth = imageWidth * (this.population / 10);
        const scaledHeight = imageHeight * (this.population / 10);

        if (nextX + scaledWidth > windowWidth || nextX - scaledWidth < 0) {
            this.velocity.flipX();
        }
        if (nextY + scaledHeight > windowHeight || nextY - scaledHeight < 0) {
            this.velocity.flipY();
        }

        this.position.add(this.velocity);
    }


    // //Method to calculate effects of being hunted
    // calculatePredation(allSpecies, timeStep) {
    //     const predationRate = this.predators.reduce((acc, predator) => {
    //         return acc + predator.energyValue / predator.size;
    //     }, 0);

    //     const energyLost = predationRate * timeStep;
    //     this.population -= energyLost;

    //     if (this.population < 0) {
    //         this.population = 0;
    //     }
    // }

    // // Method that incorporates all population change factors
    // calculatePopulationChange(allSpecies, environment, timeStep) {
    //     const baseGrowth = this.population * (this.birthRate - this.deathRate) * timeStep;

    //     // Add effects of resources (for producers) or prey (for consumers)
    //     let resourceEffect = 0;
    //     if (this.dietType === 'producer') {
    //         resourceEffect = environment.resources;
    //     } else {
    //         // Need to find actual prey species objects from their IDs
    //         resourceEffect = this.prey.reduce((acc, preyId) => {
    //             const preySpecies = allSpecies.find(species => species.id === preyId);
    //             if (preySpecies) {
    //                 return acc + preySpecies.population * preySpecies.energyValue;
    //             }
    //             return acc;
    //         }, 0);
    //     }
    //     const resourceEffectRate = resourceEffect / this.energyNeeds;

    //     // Subtract effects of being hunted by predators
    //     const predationEffect = this.predators.reduce((acc, predatorId) => {
    //         const predatorSpecies = allSpecies.find(species => species.id === predatorId);
    //         if (predatorSpecies) {
    //             return acc + predatorSpecies.population * (predatorSpecies.energyValue / predatorSpecies.size);
    //         }
    //         return acc;
    //     }, 0);
    //     const predationEffectRate = predationEffect / this.size;

    //     // Apply environmental effects
    //     const environmentalEffect = environment.temperature > this.temperatureRange.max ||
    //         environment.temperature < this.temperatureRange.min ?
    //         -0.5 : 1;

    //     // Apply carrying capacity and density-dependent factors
    //     const carryingCapacity = environment.carryingCapacity;
    //     const densityDependentEffect = this.population / carryingCapacity;

    //     // Calculate total population change
    //     const totalPopulationChange = baseGrowth + resourceEffectRate - predationEffectRate + environmentalEffect - densityDependentEffect;

    //     // Update population
    //     this.population += totalPopulationChange * timeStep;

    //     // Ensure population doesn't go below zero
    //     if (this.population < 0) {
    //         this.population = 0;
    //     }

    //     // Return total population change (don't update history here)
    //     return totalPopulationChange;
    // }

    // // Method that applies calculated changes
    // update(allSpecies, environment, timeStep) {
    //     // Calculate all population changes
    //     const totalPopulationChange = this.calculatePopulationChange(allSpecies, environment, timeStep);

    //     // Update the population history after population has been modified
    //     this.populationHistory.push(this.population);

    //     // Limit history length to prevent memory issues
    //     if (this.populationHistory.length > 1000) {
    //         this.populationHistory.shift();
    //     }

    //     // Return updated population
    //     return this.population;
    // }

    toObject() {
        return {
            id: this.id,
            name: this.name,
            population: this.population,
            birthRate: this.birthRate,
            deathRate: this.deathRate,
            dietType: this.dietType,
            energyValue: this.energyValue,
            energyNeeds: this.energyNeeds,
            velocity: this.velocity.toObject(),
            size: this.size,
            color: this.color,
            predators: this.predators,
            prey: this.prey,
            temperatureRange: this.temperatureRange,
            hibernation: this.hibernation,
            hibernationActive: this.hibernationActive,
            position: this.position.toObject()
        }
    }
}

export class Bear extends Species {
    constructor({
        id = "000001",
        name = "Bear",
        population = 10,
        birthRate = 0.5,
        deathRate = 0.01,
        dietType = "carnivore",
        energyValue = 15,
        energyNeeds = 20,
        velocity = new Vector(1, 0),
        size = 10,
        position = new Vector(0, 0)
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
            velocity,
            size,
            position
        });

        this.predators = ['wolves'];
        this.prey = ['deer', 'rabbits', 'squirrels'];
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

export class Deer extends Species {
    constructor({
        id = "001002",
        name = "Deer",
        population = 10,
        birthRate = 0.5,
        deathRate = 0.1,
        dietType = "herbivore",
        energyValue = 5,
        energyNeeds = 8,
        velocity = new Vector(3, 0),
        size = 2,
        position = new Vector(0, 0)
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
            velocity,
            size,
            position
        });

        this.predators = ['wolves', 'bears'];
        this.prey = [];
        this.temperatureRange = {
            min: -20,
            max: 30,
            optimal: 15
        };
    }
}

export class Rabbit extends Species {
    constructor({
        id = "001001",
        name = "Rabbit",
        population = 10,
        birthRate = 0.7,
        deathRate = 0.15,
        dietType = "herbivore",
        energyValue = 3,
        energyNeeds = 6,
        velocity = new Vector(4, 0),
        size = 1,
        position
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
            velocity,
            size,
            position
        });

        this.predators = ['foxes', 'hawks', 'snakes'];
        this.prey = [];
        this.temperatureRange = {
            min: -20,
            max: 30,
            optimal: 15
        };
    }
}
