class Person {
    constructor(name,age) {
        this.name = name;
        this.age = age;
    }

    info() {
        console.log(`Hi, I'm ${this.name}, ${this.age} years old. I'm the creator of this page.`);
    }
}

const preston = new Person("preston", 27);

preston.info();