"use strict";
var eventMixin = require("../mixins/event");


function GameBoard (wrap) {
    this.wrap = wrap;
    this.markers = {
        human: "cross",
        computer: "circle"
    };

    [].forEach.call(wrap.getElementsByClassName("__cell"), this.bindEvent.bind(this));
}

GameBoard.prototype.bindEvent = function(el) {
    var self = this;
    el.addEventListener("click", function (event) {
        this.classList.add("_" + self.markers.human);
        self.trigger("move", { 
            x: this.dataset.x, 
            y: this.dataset.y
        });
    }, false);
}

GameBoard.prototype.erase = function() {
    var self = this;
    [].forEach.call(this.wrap.getElementsByClassName("__cell"), function(el) {
        el.classList.remove("_" + self.markers.human, "_" + self.markers.computer);
    });
}


for (var key in eventMixin) {
    GameBoard.prototype[key] = eventMixin[key];
}

module.exports = GameBoard;

