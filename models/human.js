var Player  = require("./player");

class Human extends Player {
    constructor(name) {
        super();
        this.name = name;
        this.marker = "h";
    }

    makeStep(step) {
        this.winNumber += 1 << ((+step.y) * 3 + (+step.x));
        this.trigger("makeStep", step);
        return;
    }
};

module.exports = Human;