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

        this.socket.on('humenMove', step => {
            this.human.trigger("makeStep", step);
        });
        
        this.game = undefined;
    }

    createGame(human, computer) {
        this.throwCoin() ? human.setFirstPleer() : computer.setFirstPleer();

        this.game = new Game(human, computer)
            .on("computerMove", move => {
                this.socket.emit("computerMove", move);
            })
            .on("gameOver", (win) => {
                this.socket.emit("gameOver", win);
                this.saveGame();
            });
        
        this.socket.emit("gameCreate", {
            markers: {
                human: human.marker,
                computer: computer.marker
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