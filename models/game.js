var Event = require("../lib/event");
var Human = require("./human");
var Computer = require("./computer");
var GameCollection = require("../collections/game");

class Game extends Event{
    constructor() {
        super();
        this.map = [[0,0,0],[0,0,0],[0,0,0]];
        this.steps = [];

        this.players = {};
        this.winNumbers = [7, 56, 448, 73, 146, 292, 273, 84];
        this.winner = undefined;
    }

    startGame(params) {
        this.map = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        this.players.human.winNumber = 0;
        this.players.computer.winNumber = 0;
        this.steps = [];
        
        if (params.firstTurn == "computer") {
            this.players.computer.makeStep(this.map);
        }

        return this;
    }

    addPleer (pleer) {
        if(pleer instanceof Human) {
            this.players.human = pleer;
        }
        if(pleer instanceof Computer) {
            this.players.computer = pleer;
        }
        return this;
    }
    initPleer () {
        this.players.human.on("makeStep", step => {
            this.map[step.y][step.x] = this.players.human.marker;
            this.steps.push(step);
            if (this.checkWin()) {
                this.winner = "human";
                this.gameOver();
            } else if (this.ifFullBorder()) {
                this.winner = "nobody";
                this.gameOver();
            } else {
                this.players.computer.makeStep(this.map);
            }
        })

        this.players.computer.on("makeStep", step => {
            this.map[step.y][step.x] = this.players.computer.marker;
            this.steps.push(step);
            this.trigger("computerMove", step);
            
            if (this.checkWin()) {
                this.winner = "computer";
                this.gameOver();
            } else if (this.ifFullBorder()) {
                this.winner = "nobody";
                this.gameOver();
            } 
        })
        return this;
    }

    checkWin() {
        let hasWinner = false;
        this.winNumbers.forEach(winNumber => {
            if (winNumber == this.players.computer.winNumber || winNumber == this.players.human.winNumber ) {
                console.log(this.players.computer.winNumber);
                hasWinner = true;
            }
        });
        return hasWinner ;
    }

    ifFullBorder () {
        return this.steps.length >= 9;
    }

    gameOver() {
        var gameParam = { 
            steps : this.steps, 
            winner: this.winner, 
            players: {
                computer: this.players.computer.name,
                human: this.players.human.name
            }   
        };
        
        (new GameCollection()).insert(gameParam);
        this.trigger("gameOver", gameParam);
    }

    getPlayed() {
        return  (new GameCollection()).get(); 
    }
  
};

module.exports = Game;