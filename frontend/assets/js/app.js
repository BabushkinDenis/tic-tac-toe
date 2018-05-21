
var io = require('socket.io-client');
var GameBoard = require("./gameBoard/gameBoard");

(function (root){

    var _initListners = function() {
        var self = this;

        document.getElementById('lets-play-btn').addEventListener("click", function (event) {
            document.getElementById("reg-player-form").classList.add("_hidden");
            self.gameBoard.show();
            self.socket.emit("letsPlay",  document.getElementById('player-name-input').value);
        });
                
        this.socket.on('gameCreate', function(gameParams){
            self.gameBoard.markers= gameParams.markers;
        });

        this.socket.on('computerMove', function(move){
            self.gameBoard.setComputerMove(move);
        });

        this.gameBoard.on("humenMove", function(move) {
            self.socket.emit("humenMove", move);
        })

        this.socket.on('gameOver', function(){
            alert("gameOver");
        })
    }


    var App = function() {
        this.socket = io.connect('http://localhost:3000');
        this.gameBoard = new GameBoard(document.getElementById('game-board'));

        _initListners.apply(this);
    };





    root.app = new App();


})(window);