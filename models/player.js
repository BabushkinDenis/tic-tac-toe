var Event  = require("../lib/event");

class Player extends Event {
    constructor() {
        super();
        this.name = "No name";
        this.winNumber = 0;
    }

    makeStep () {
        return false;
    }

    setPlayerName (name) {
        this.name = name;
    }
};

module.exports = Player;