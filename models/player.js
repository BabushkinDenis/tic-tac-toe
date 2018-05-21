var Event = require("../lib/event");

class Player extends Event {
    constructor(name) {
        super();
        this.name = name || "Neo";
        this.typePlayer = name ? "HUMAN" : "COMPUTER";
    }
};

module.exports = Player;