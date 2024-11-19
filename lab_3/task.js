// 1.2.3 Створення об'єкта car1 за допомогою new Object()
let car1 = new Object();
car1.color = "red";
car1.maxSpeed = 120;
car1.driver = new Object();
car1.driver.name = "Aleksandr Tsybulskyy";
car1.driver.category = "C";
car1.driver.personalLimitations = "No driving at night";
car1.tuning = true;
car1.numberOfAccidents = 0;

// 1.2.4 Створення об'єкта car2 за допомогою літерала об'єкта
let car2 = {
    color: "blue",
    maxSpeed: 100,
    driver: {
        name: "Aleksandr Tsybulskyy",
        category: "B",
        personalLimitations: null
    },
    tuning: false,
    numberOfAccidents: 2
};

// 1.2.5 Додавання методу drive до об'єкта car1
car1.drive = function() {
    console.log("I am not driving at night");
};
car1.drive();

// 1.2.6 Додавання методу drive до об'єкта car2
car2.drive = function() {
    console.log("I can drive anytime");
};
car2.drive();

// 1.2.7 Конструктор для "класу" Truck
function Truck(color, weight, avgSpeed, brand, model) {
    this.color = color;
    this.weight = weight;
    this.avgSpeed = avgSpeed;
    this.brand = brand;
    this.model = model;
}

// 1.2.8 Створення статичного методу AssignDriver для Truck
Truck.prototype.AssignDriver = function(name, nightDriving, experience) {
    this.driver = {
        name: name,
        nightDriving: nightDriving,
        experience: experience
    };
};

// 1.2.9 Додавання методу trip до Truck
Truck.prototype.trip = function() {
    if (!this.driver) {
        console.log("No driver assigned");
    } else {
        let message = `Driver ${this.driver.name}`;
        message += this.driver.nightDriving ? " drives at night" : " does not drive at night";
        message += ` and has ${this.driver.experience} years of experience`;
        console.log(message);
    }
};

// 1.2.10 Створення двох об'єктів Truck і демонстрація роботи методу trip
let truck1 = new Truck("green", 5000, 90, "Volvo", "FH");
truck1.AssignDriver("Aleksandr Tsybulskyy", true, 5);
truck1.trip();

let truck2 = new Truck("yellow", 4500, 80, "Scania", "R480");
truck2.AssignDriver("Aleksandr Tsybulskyy", false, 3);
truck2.trip();

// 1.2.12 Створення класу Square
class Square {
    constructor(a) {
        this.a = a;
    }

    static help() {
        console.log("A square is a geometric figure with four equal sides and four right angles.");
    }

    length() {
        console.log(`Sum of the sides: ${4 * this.a}`);
    }

    square() {
        console.log(`Area: ${this.a * this.a}`);
    }

    info() {
        console.log(`Sides: ${this.a}, Angles: 90 degrees, Sum of sides: ${4 * this.a}, Area: ${this.a * this.a}`);
    }
}

// 1.2.16 Створення класу Rectangle шляхом успадкування від Square
class Rectangle extends Square {
    constructor(a, b) {
        super(a);
        this.b = b;
    }

    static help() {
        console.log("A rectangle is a quadrilateral with opposite sides equal and four right angles.");
    }

    length() {
        console.log(`Sum of the sides: ${2 * (this.a + this.b)}`);
    }

    square() {
        console.log(`Area: ${this.a * this.b}`);
    }

    info() {
        console.log(`Sides: ${this.a}, ${this.b}, Angles: 90 degrees, Sum of sides: ${2 * (this.a + this.b)}, Area: ${this.a * this.b}`);
    }
}

// 1.2.18 Створення класу Rhombus шляхом успадкування від Square
class Rhombus extends Square {
    constructor(a, alpha, beta) {
        super(a);
        this.alpha = alpha;
        this.beta = beta;
    }

    static help() {
        console.log("A rhombus is a quadrilateral with all sides equal and opposite angles equal.");
    }

    length() {
        console.log(`Sum of the sides: ${4 * this.a}`);
    }

    square() {
        const area = this.a * this.a * Math.sin(this.alpha * Math.PI / 180);
        console.log(`Area: ${area}`);
    }

    info() {
        console.log(`Sides: ${this.a}, Angles: ${this.alpha}, ${this.beta}, Sum of sides: ${4 * this.a}, Area: ${this.a * this.a * Math.sin(this.alpha * Math.PI / 180)}`);
    }
}

// 1.2.20 Створення класу Parallelogram шляхом успадкування від Rectangle
class Parallelogram extends Rectangle {
    constructor(a, b, alpha, beta) {
        super(a, b);
        this.alpha = alpha;
        this.beta = beta;
    }

    static help() {
        console.log("A parallelogram is a quadrilateral with opposite sides equal and opposite angles equal.");
    }

    length() {
        console.log(`Sum of the sides: ${2 * (this.a + this.b)}`);
    }

    square() {
        const area = this.a * this.b * Math.sin(this.alpha * Math.PI / 180);
        console.log(`Area: ${area}`);
    }

    info() {
        console.log(`Sides: ${this.a}, ${this.b}, Angles: ${this.alpha}, ${this.beta}, Sum of sides: ${2 * (this.a + this.b)}, Area: ${this.a * this.b * Math.sin(this.alpha * Math.PI / 180)}`);
    }
}

// Створення об'єктів та демонстрація роботи методів
let square = new Square(5);
square.length();
square.square();
square.info();

let rectangle = new Rectangle(5, 10);
rectangle.length();
rectangle.square();
rectangle.info();

let rhombus = new Rhombus(5, 60, 120);
rhombus.length();
rhombus.square();
rhombus.info();

let parallelogram = new Parallelogram(5, 10, 60, 120);
parallelogram.length();
parallelogram.square();
parallelogram.info();
