var Event = require("../lib/event");

class Player extends Event {
    constructor(name) {
        super();
        this.name = name || "No name";
        this.isFirstPleer =  false;
        this.marker = "circle";
        this.winNumber = 0;
    }

    makeStep(map) {
        if (this.name !== "No name") {
            var step = map;
        } else {
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
        }

        this.winNumber += 1 << (step.x * 3 + step.y);
        this.trigger("makeStep", step);
        return;
    }

    setPlayerName (name) {
        this.name = name;
    }

    setFirstPleer(fl) {
        this.isFirstPleer = fl;
        this.marker = fl ? "cross":"circle";
    }
};

module.exports = Player;