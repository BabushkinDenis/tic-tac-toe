"use strict";
var eventMixin = require("../mixins/event");


function GameBoard (wrap) {
    this.wrap = wrap;
    this.markers = {
        human: "cross",
        computer: "circle"
    };

    [].forEach.call(wrap.getElementsByClassName("__cell"), this.onCellClick.bind(this));
}

GameBoard.prototype.onCellClick = function(el) {
    var self = this;
    el.addEventListener("click", function (event) {
        if(!this.classList.contains("__checked")) {
            this.classList.add("_" + self.markers.human);
            this.classList.add("__checked");
            self.trigger("humenMove", { 
                x: this.dataset.x, 
                y: this.dataset.y
            });
        }
    }, false);
}

GameBoard.prototype.setComputerMove = function(move) {
    var self = this;
    [].forEach.call(this.wrap.getElementsByClassName("__cell"), function(el) {
        if(el.dataset.x == move.x && el.dataset.y == move.y) {
            el.classList.add("_" + self.markers.computer);
            el.classList.add("__checked");
        }
    })
}

GameBoard.prototype.show  = function() {
    this.wrap.classList.remove("_hidden");
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

