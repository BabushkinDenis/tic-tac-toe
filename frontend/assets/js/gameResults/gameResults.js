"use strict";
var eventMixin = require("../mixins/event");
var _ = require("underscore");


function GameResults(wrap) {
    this.wrap = wrap;
    this.rows = [];
}


GameResults.prototype.show = function() {
    this.wrap.classList.remove("_hidden");
}

GameResults.prototype.addRow = function(row){
    var tpl = _.template("<div>hello: <%= name %></div><div>test</div>");
    
    document.getElementById('game-results').innerHTML = tpl({name: 'moe'});
    this.rows.push(row);
}

for (var key in eventMixin) {
    GameResults.prototype[key] = eventMixin[key];
}



module.exports = GameResults;