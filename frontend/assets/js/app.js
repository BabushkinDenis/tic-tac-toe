
var io = require('socket.io-client');
var GameBoard = require("./gameBoard/gameBoard");

(function (root){

    var _initListners = function() {
        var self = this;

        this.socket.on('gameInited', function(socket){
            self.socket.emit("turn", [1,3]);
        });

        this.socket.on('turn', function(turn){
            console.log(turn);
        });

        this.gameBoard.on("move", function(move){
            console.log(move);
        })
    }


    var App = function() {
        this.socket = io.connect('http://localhost:3000');
        this.gameBoard = new GameBoard(document.getElementById('game-board'));

        _initListners.apply(this);
    };





    root.app = new App();


})(window);