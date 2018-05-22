
var io = require('socket.io-client');
var GameBoard = require("./gameBoard/gameBoard");
var RegForm = require("./regForm/regForm");
var GameResults = require("./gameResults/gameResults");

(function (root){

    var _dispatcher = function() {
        var self = this;

        this.regForm.on("form-submited", function(formData) {
            self.newGameBtn.classList.remove("_hidden");
            self.gameBoard.show();
            self.gameResults.show();
            self.socket.emit("setPlayerName", formData.pleerName);
            self.socket.emit("startGame");
            self.socket.emit("getGames");
        });
                  
        this.socket.on('gameCreate', function(gameParams) {
            self.gameBoard.startGame(gameParams);
        });

        this.socket.on('computerMove', function(move){
            self.gameBoard.setComputerMove(move);
        });
                
        this.gameBoard.on("humenMove", function(move) {
            self.socket.emit("humenMove", move);
        });



        this.socket.on('gameOver', function(result){
            self.gameBoard.stopGame();
            console.log("gameOver", result);
        });


        this.socket.on("playedGames", function(playedGanes){
            console.log(playedGanes);
            (playedGanes||[]).forEach(function(row){
                self.gameResults.addRow(row);                
            });
        });

        this.newGameBtn.addEventListener("click", function (event) {
            self.socket.emit("startGame");
        });
    }


    var App = function() {
        this.socket = io.connect('http://localhost:3000');
        this.regForm = new RegForm(document.getElementById("reg-player-form"));
        this.gameBoard = new GameBoard(document.getElementById('game-board'));
        this.gameResults = new GameResults(document.getElementById('game-results')); 
        this.newGameBtn = document.getElementById('new-game-btn');
        _dispatcher.apply(this);
    };





    root.app = new App();


})(window);