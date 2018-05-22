"use strict";
var eventMixin = require("../mixins/event");


function GameResults(wrap) {
    this.wrap = wrap;

}


GameResults.prototype.show = function() {
    this.wrap.classList.remove("_hidden");
}


for (var key in eventMixin) {
    GameResults.prototype[key] = eventMixin[key];
}



module.exports = GameResults;