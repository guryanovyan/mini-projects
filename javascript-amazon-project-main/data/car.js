class Car {
    #brand;
    #model;
    speed = 0;
    isTrunkOpen = false;

    constructor(carDetails) {
        this.#brand = carDetails.brand;
        this.#model = carDetails.model;
    }

    displayInfo(){
        const trunkStatus = this.isTrunkOpen ? 'Open' : 'Closed';

        console.log(`${this.#brand} ${this.#model} | Speed: ${this.speed} km/h | Trunk: ${trunkStatus}`);
    }

    go() {
        if (this.speed < 200 && !this.isTrunkOpen) {
            this.speed += 5;
        }
    }
    
    break() {
        if (this.speed > 0) {
            this.speed -= 5;
        }
    }

    openTrunk() {
        if (this.speed === 0) {
            this.isTrunkOpen = true;
        }
    }

    closeTrunk() {
        this.isTrunkOpen = false;
    }
}

class RaceCar extends Car {
    acceleration;

    constructor(carDetails) {
        super(carDetails);
        this.acceleration = carDetails.acceleration;
    }

    go() {
        if (this.speed < 300) {
            this.speed += this.acceleration;
        }
    }

    openTrunk() {
        console.log('Race cars do not have trunks');
    }

    closeTrunk() {
        console.log('Race cars do not have trunks');
    }
}

const car1 = new Car({brand: 'Toyota', model: 'Corolla'});
const car2 = new Car({brand: 'Tesla', model: 'Model 3'});
const car3 = new RaceCar({brand: 'McLaren', model: 'F1', acceleration: 20});

car1.openTrunk();

car1.go();
car2.break();
car3.go();
car3.go();

car1.displayInfo();
car2.displayInfo();
car3.displayInfo();
