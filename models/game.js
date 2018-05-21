// var MongoClient    = require('mongodb').MongoClient;

// MongoClient.connect("mongodb://sandbox:gtcjxybwf@ds129560.mlab.com:29560/tic-tac-toe", (err, db) => {
// //    console.log(err, db)
// });
var Event = require("../lib/event");

class Game extends Event{
    constructor(human, computer) {
        super();
        this.map = [[0,0,0],[0,0,0],[0,0,0]];
        this.steps = [];
        this.human = human;
        this.computer = computer;
       
    }

    startGame() {
       
        this.human.on("makeStep", step => {
            this.map[step.y][step.x] = this.human.marker;
            
            if(this.ifHaveWinLine()) {
                this.trigger("gameOver", "human");
            } else if (this.ifFullBorder()) {
                this.trigger("gameOver");
            } else {
                this.computer.makeStep(this.map);
            }
        })

        this.computer.on("makeStep", step => {
            this.map[step.y][step.x] = this.computer.marker;
            if(this.ifHaveWinLine()) {
                this.trigger("gameOver", "computer");
            } else if (this.ifFullBorder()) {
                this.trigger("gameOver");
            } else {
                this.trigger("computerMove", step);
            }
        })


        if(this.computer.isFirstPleer) {
            this.computer.makeStep(this.map);
        }
        return this;
    }
    ifHaveWinLine () {
        return false;
    }

    ifFullBorder () {
        var boardIsFull = true;
        this.map.forEach(function(col, y){
            col.forEach( function(cell, x) {
                if(cell == 0) {
                    boardIsFull  = false;
                }
            })
        });
        return boardIsFull;
    }

    stopGame()  {

    }
};

module.exports = Game;