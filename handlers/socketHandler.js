var Room = require("../models/room");

function socketHandler(io) {
    io.on('connection', function(socket) {
        var room = new Room(socket);

        
    });
};


module.exports = socketHandler;