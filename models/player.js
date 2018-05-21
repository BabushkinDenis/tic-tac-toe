var Event = require("../lib/event");

class Player extends Event {
    constructor(name) {
        super();
        this.name = name || "Neo";
        this.typePlayer = name ? "HUMAN" : "COMPUTER";
        this.isFirstPleer =  false;
        this.marker = "circle";
    }

    makeStep(map) {
        var step = {};
        map.forEach(function(col, y){
            col.forEach( function(cell, x) {
                if(cell == 0) {
                    step = {
                        x: x,
                        y:y
                    };
                }
            })
        })
        
        this.trigger("makeStep", step);
    }

    setFirstPleer() {
        this.isFirstPleer = true;
        this.marker ="cross";
    }
};

module.exports = Player;