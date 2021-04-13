const { getLineAndCharacterOfPosition, getDefaultFormatCodeSettings } = require("typescript");


class And {
    constructor(augsArray = []) {
        this.augs = augsArray;
        return this.getSerialisation();
    }
    
    getSerialisation() {
        return `AND(${this.augs.join(",")})`;
    }

    getPath() {
        return [this.augs.join(",")];
    }
}

class OR {
    constructor(augsArray = []) {
        this.augs = augsArray;
        return this.getSerialisation();
    }
    
    getSerialisation() {
        return `OR(${this.augs.join(",")})`;
    }

    getPath() {
        return this.augs;
    }
}

const testStack = ["AND", 2, "Activity_10ttrdj", "OR", 2, "Activity_17ymcwz", "Activity_0nyqi0b"];
const testStackO = [
    new And([
        "Activity_10ttrdj", 
        new OR([
            "Activity_17ymcwz",
            "Activity_0nyqi0b"
        ])
    ])
];

class Script {
    constructor(object) {
        this.object = object;
    }
    resolve() {
        this.object.getSerialisation();
    }

}

console.log(new Script(testStackO));




checkIfAndsAreInTheOrs(): boolean
checkIfOrsAreInTheAnds(): boolean
popAndResolveAnds()
popAndResolveOrs()