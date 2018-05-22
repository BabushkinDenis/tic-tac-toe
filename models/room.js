var Human = require("./human");
var Computer = require("./computer");
var Game = require("./game");

class Room {

    constructor(socket) {
        this.socket = socket;
        this.computer = new Computer();
        this.human = new Human();

        this.game = new Game()
            .addPleer(this.human, "human")
            .addPleer(this.computer, "computer")
            .initPleer()
            .on('computerMove', move => {
                this.socket.emit('computerMove', move);
            })
            .on('gameOver', (win) => {
                this.socket.emit('gameOver', win);
                this.saveGame();
            });

        this.socket.on('setPlayerName', this.human.setPlayerName.bind(this.human));
        this.socket.on("startGame", this.createGame.bind(this));
        this.socket.on('humenMove', this.human.makeStep.bind(this.human));
    }

    createGame() {
        let coin = this.throwCoin();
        
        this.human.setFirstPleer(coin);
        this.computer.setFirstPleer(!coin);
              
        this.socket.emit('gameCreate', {
            markers: {
                human: this.game.players[0].marker,
                computer: this.game.players[1].marker
            }
        });
        
        this.game.startGame(); 
    }

    throwCoin () {
        return  Math.random() < 0.5 ;
    }

    saveGame() {

    }

    getGames() {

    }


};

module.exports = Room;