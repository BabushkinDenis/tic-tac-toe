// var MongoClient    = require('mongodb').MongoClient;

// MongoClient.connect("mongodb://sandbox:gtcjxybwf@ds129560.mlab.com:29560/tic-tac-toe", (err, db) => {
// //    console.log(err, db)
// });
var Event = require("../lib/event");

class Game extends Event{
    constructor(human, computer) {
        super();
        this.map = [[0,0,0],[0,0,0],[0,0,0]];
        this.log = {};
        this.human = human;
        this.computer = computer;
    }

    startGame() {
        this.human.on("makeStep", step => {
            console.log(step);
            if(!this.ifGameOver()) {
                this.computer.makeTurn();
            }
        })

        return this;
    }

    ifGameOver () {

        return true;
    }

    stopGame()  {

    }
};

module.exports = Game;