// var MongoClient    = require('mongodb').MongoClient;

// MongoClient.connect("mongodb://sandbox:gtcjxybwf@ds129560.mlab.com:29560/tic-tac-toe", (err, db) => {
// //    console.log(err, db)
// });
var Event = require("../lib/event");

class Game extends Event{
    constructor() {
        super();
        this.map = [[0,0,0],[0,0,0],[0,0,0]];
        this.steps = [];

        this.players = [];
        this.winNumbers = [7, 56, 448, 73, 146, 292, 273, 84];
        // this.human = human;
        // this.computer = computer;
       
    }

    startGame() {
        this.map = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        this.players[0].winNumber = 0;
        this.players[1].winNumber = 0;
        this.steps = [];
        if (this.players[1].isFirstPleer) {
            this.players[1].makeStep(this.map);
        }

        console.log(this.map);
        return this;
    }

    addPleer (pleer) {
        this.players.push(pleer);
        return this;
    }
    initPleer () {
        this.players[0].on("makeStep", step => {
            this.map[step.y][step.x] = this.players[0].marker;
            this.steps.push(step);
            if (this.checkWin()) {
                this.trigger("gameOver", "human");
            } else if (this.ifFullBorder()) {
                this.trigger("gameOver", "pat");
            } else {
                this.players[1].makeStep(this.map);
            }
        })

        this.players[1].on("makeStep", step => {
            this.map[step.y][step.x] = this.players[1].marker;
            this.steps.push(step);
            this.trigger("computerMove", step);
            if (this.checkWin()) {
                this.trigger("gameOver", "computer");
            } else if (this.ifFullBorder()) {
                this.trigger("gameOver", "pat");
            } 
        })
        return this;
    }

    checkWin() {
        let hasWinner = false;
        console.log(this.players[0].winNumber, this.players[1].winNumber);
        this.winNumbers.forEach(winNumber => {
            if (winNumber == this.players[0].winNumber || winNumber == this.players[1].winNumber ) {
                hasWinner = true;
            }
        });
        return hasWinner ;
    }

    ifFullBorder () {
        return this.steps.length >= 9;
    }

  
};

module.exports = Game;