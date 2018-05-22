var Player  = require("./player");

class Human extends Player {
    constructor(name) {
        super();
        this.name = name;
        this.marker = "h";
    }

    makeStep(step) {
        this.winNumber += 1 << ((+step.x) * 3 + (+step.y));
        this.trigger("makeStep", step);
        return;
    }
};

module.exports = Human;