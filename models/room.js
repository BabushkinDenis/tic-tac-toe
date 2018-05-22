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
            });

        this.socket.on('setPlayerName', this.human.setPlayerName.bind(this.human));
        this.socket.on("startGame", this.createGame.bind(this));
        this.socket.on('humenMove', this.human.makeStep.bind(this.human));
        this.socket.on('getGames', () => {
            this.game.getPlayed()
                .then(result=>{
                    this.socket.emit("playedGames", result);
                });
        });
    }

    createGame() {
        let firstTurn = this.throwCoin();
        this.socket.emit('gameCreate', {
            firstTurn: firstTurn
        });
       
        this.game.startGame({
            firstTurn: firstTurn
        }); 
    }

    throwCoin () {
        return  Math.random() < 0.5  ? "computer" : "human";
    }
};

module.exports = Room;