var Player  = require("./player");

class Human extends Player {
    constructor(name) {
        super();
        this.name = name;
        this.marker = "h";
        this.scoreCombinations = [];
    }

    makeStep(step) {
        this.scoreCombinations = this.scoreCombinations
            .concat( 1 << ((+step.y) * 3 + (+step.x)), this.scoreCombinations.map(function (el) { return el + ( 1 << ((+step.y) * 3 + (+step.x)))}));

            this.trigger("makeStep", step);
        return;
    }
};

module.exports = Human;