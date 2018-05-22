var Player = require("./player");

class Computer extends Player {
    constructor() {
        super();
        this.name = "Computer";
        this.marker = "c";

    }

    makeStep(map) {
        var step = {};
        map.forEach(function (col, y) {
            col.forEach(function (cell, x) {
                if (cell == 0) {
                    step = {
                        x: x,
                        y: y
                    };
                }
            })
        })

        this.winNumber += 1 << (step.x * 3 + step.y);
        this.trigger("makeStep", step);
        return;
    }
};



module.exports = Computer;