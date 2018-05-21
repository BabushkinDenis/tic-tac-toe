var Player = require("./player");
var Game = require("./game");

class Room {

    constructor(socket) {
        this.socket = socket;

        this.socket.on('letsPlay', playerName => {
            this.human = new Player(playerName),
            this.computer = new Player();
           
            this.createGame(this.human, this.computer);
        });

        this.socket.on('makeStep', step => {
            //console.log(step);
            this.human.trigger("makeStep", step);
        });

        
        this.game = undefined;
    }

    createGame(human, computer) {
        this.game = new Game(human, computer);

        this.game.startGame()
            .on("humanTurn", turn => {
                this.socket.emit("humanTurn", turn);
            })
            .on("gameOver", (win) => {
                this.socket.emit("gameOver", win);
                this.saveGame();
            });
    }

    saveGame() {

    }

    getGames() {

    }


};

module.exports = Room;