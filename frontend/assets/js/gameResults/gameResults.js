"use strict";
var eventMixin = require("../mixins/event");
var _ = require("underscore");
var $ = function (selector) {
    return document.querySelector(selector);
};

function GameResults(wrap) {
    this.wrap = wrap;
    this.rows = [];
}


GameResults.prototype.show = function() {
    this.wrap.classList.remove("_hidden");
}

GameResults.prototype.addRow = function(row){
    var self = this;
    var container = document.createElement('div');
    var tpl = _.template('<div class = "GameResults__row __row" data-id = "<%= _id %>">' + 
                            '<div class = "GameResults__cell"><%= players.human %></div>'+
                            '<div class = "GameResults__cell _computer"><span class = "icon-display"></span></div>'+
                            '<div class = "GameResults__cell "> <span class = "_icon _winer<%= winner %>"> </span></div>'+
                        '</div>');                    
    container.innerHTML = tpl(_.extend(row, {_id: _.uniqueId()}));  
    //$('#game-table').appendChild(container);
    $('#game-table').insertBefore(container,  $('#game-table').firstChild);
    container.firstChild.onclick = function(){
        var id = this.dataset.id
        self.trigger("gameSelected",_.find(self.rows, function(row) {
            return row._id == id;
        }));
    }

    this.rows.push(row);
}

for (var key in eventMixin) {
    GameResults.prototype[key] = eventMixin[key];
}


module.exports = GameResults;