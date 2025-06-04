class Species {
    constructor({
        id = Math.random().toString(36).substring(2, 9),
        name = 'Unnamed Species',
        population = 10,
        birthRate = 0.1,
        deathRate = 0.05,
        dietType = 'herbivore', //Options: 'producer', 'herbivore', 'carnivore'
        energyValue = 10, //How much energy it provides when eaten
        energyNeeds = 5, //How much energy it needs to survive
        movementSpeed = 1, //how fast it moves in the enviorment
        size = 1,   //relative size
        color = '#' + Math.floor(Math.random() * 16777215).toString(16),
        // initial position
        x = 0,
        y = 0,
    } = {}) {
        this.id = id;
        this.name = name;

        this.population = population;
        this.birthRate = birthRate;
        this.deathRate = deathRate;
        this.populationHistory = [population];

        this.dietType = dietType;
        this.predators = [];
        this.prey = [];

        this.energyValue = energyValue;
        this.energyNeeds = energyNeeds;
        this.movementSpeed = movementSpeed;
        this.size = size;

        this.color = color;

        this.temperatureRange = {
            min: 0,
            max: 40,
            optimal: 25
        };

        this.x = x;
        this.y = y;
    }

    //Method to calculate effects of being hunted
    calculatePredation(allSpecies, timeStep) {
        const predationRate = this.predators.reduce((acc, predator) => {
            return acc + predator.energyValue / predator.size;
        }, 0);

        const energyLost = predationRate * timeStep;
        this.population -= energyLost;

        if (this.population < 0) {
            this.population = 0;
        }
    }

    // Method that incorporates all population change factors
    calculatePopulationChange(allSpecies, environment, timeStep) {
        const baseGrowth = this.population * (this.birthRate - this.deathRate) * timeStep;

        // Add effects of resources (for producers) or prey (for consumers)
        let resourceEffect = 0;
        if (this.dietType === 'producer') {
            resourceEffect = environment.resources;
        } else {
            // Need to find actual prey species objects from their IDs
            resourceEffect = this.prey.reduce((acc, preyId) => {
                const preySpecies = allSpecies.find(species => species.id === preyId);
                if (preySpecies) {
                    return acc + preySpecies.population * preySpecies.energyValue;
                }
                return acc;
            }, 0);
        }
        const resourceEffectRate = resourceEffect / this.energyNeeds;

        // Subtract effects of being hunted by predators
        const predationEffect = this.predators.reduce((acc, predatorId) => {
            const predatorSpecies = allSpecies.find(species => species.id === predatorId);
            if (predatorSpecies) {
                return acc + predatorSpecies.population * (predatorSpecies.energyValue / predatorSpecies.size);
            }
            return acc;
        }, 0);
        const predationEffectRate = predationEffect / this.size;

        // Apply environmental effects
        const environmentalEffect = environment.temperature > this.temperatureRange.max ||
            environment.temperature < this.temperatureRange.min ?
            -0.5 : 1;

        // Apply carrying capacity and density-dependent factors
        const carryingCapacity = environment.carryingCapacity;
        const densityDependentEffect = this.population / carryingCapacity;

        // Calculate total population change
        const totalPopulationChange = baseGrowth + resourceEffectRate - predationEffectRate + environmentalEffect - densityDependentEffect;

        // Update population
        this.population += totalPopulationChange * timeStep;

        // Ensure population doesn't go below zero
        if (this.population < 0) {
            this.population = 0;
        }

        // Return total population change (don't update history here)
        return totalPopulationChange;
    }

    // Method that applies calculated changes
    update(allSpecies, environment, timeStep) {
        // Calculate all population changes
        const totalPopulationChange = this.calculatePopulationChange(allSpecies, environment, timeStep);

        // Update the population history after population has been modified
        this.populationHistory.push(this.population);

        // Limit history length to prevent memory issues
        if (this.populationHistory.length > 1000) {
            this.populationHistory.shift();
        }

        // Return updated population
        return this.population;
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
        movementSpeed = 4,
        size = 10,
        color = "#8B4513",
        x = 0,
        y = 0,
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
            color,
            x,
            y
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
            movementSpeed: this.movementSpeed,
            size: this.size,
            color: this.color,
            predators: this.predators,
            prey: this.prey,
            temperatureRange: this.temperatureRange,
            hibernation: this.hibernation,
            hibernationActive: this.hibernationActive,
            x: this.x,
            y: this.y
        }
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
        movementSpeed = 3,
        size = 2,
        color = "#8B4514",
        x = 0,
        y = 0,
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
            color,
            x,
            y
        });

        this.predators = ['wolves', 'bears'];
        this.prey = [];
        this.temperatureRange = {
            min: -20,
            max: 30,
            optimal: 15
        };
    }

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
            movementSpeed: this.movementSpeed,
            size: this.size,
            color: this.color,
            predators: this.predators,
            prey: this.prey,
            temperatureRange: this.temperatureRange,
            x: this.x,
            y: this.y
        }
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
        movementSpeed = 4,
        size = 1,
        color = "#A52A2A",
        x = 0,
        y = 0
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
            color,
            x,
            y
        });

        this.predators = ['foxes', 'hawks', 'snakes'];
        this.prey = [];
        this.temperatureRange = {
            min: -20,
            max: 30,
            optimal: 15
        };
    }

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
            movementSpeed: this.movementSpeed,
            size: this.size,
            color: this.color,
            predators: this.predators,
            prey: this.prey,
            temperatureRange: this.temperatureRange,
            x: this.x,
            y: this.y
        }
    }
}
