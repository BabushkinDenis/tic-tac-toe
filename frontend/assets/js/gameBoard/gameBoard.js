"use strict";
var eventMixin = require("../mixins/event");

function GameBoard (wrap) {
    this.wrap = wrap;
    this.turn = false;
    this.markers = {
        human: "cross",
        computer: "circle"
    };

    [].forEach.call(wrap.getElementsByClassName("__cell"), this.onCellClick.bind(this));
}

GameBoard.prototype.onCellClick = function(el) {
    var self = this;
    el.addEventListener("click", function (event) {
        if(!this.classList.contains("__checked") && !self.lock) {
            this.classList.add("_" + self.markers.human);
            this.classList.add("__checked");
            self.trigger("humenMove", { 
                x: parseInt(this.dataset.x), 
                y: parseInt(this.dataset.y)
            });
            self.turn = "computer";
        }
    }, false);
}

GameBoard.prototype.setComputerMove = function(move) {
    var self = this;
    this.lock = false;
    [].forEach.call(this.wrap.getElementsByClassName("__cell"), function(el) {
        if(el.dataset.x == move.x && el.dataset.y == move.y) {
            el.classList.add("_" + self.markers.computer);
            el.classList.add("__checked");
        }
    })
}

GameBoard.prototype.setHumanMove = function(move) {
    var self = this;
    this.lock = true;
    [].forEach.call(this.wrap.getElementsByClassName("__cell"), function(el) {
        if(el.dataset.x == move.x && el.dataset.y == move.y) {
            el.classList.add("_" + self.markers.human);
            el.classList.add("__checked");
        }
    })
}

GameBoard.prototype.show  = function() {
    this.wrap.classList.remove("_hidden");
}
GameBoard.prototype.startGame = function(params) {
    console.log(params);
    if(params.firstTurn == "computer") {
        this.lock = true;
        this.markers = {
            human: "circle",
            computer: "cross"
        };
    } else {
        this.lock = false;
    }
    
    this.erase();
}

GameBoard.prototype.stopGame = function() {
    this.lock = true;
    return this;
}

GameBoard.prototype.erase = function() {
    var self = this;
    [].forEach.call(this.wrap.getElementsByClassName("__cell"), function(el) {
        el.classList.remove("_" + self.markers.human, "_" + self.markers.computer, "__checked");
    });
}


for (var key in eventMixin) {
    GameBoard.prototype[key] = eventMixin[key];
}

module.exports = GameBoard;

