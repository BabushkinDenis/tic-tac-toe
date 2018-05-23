var Player = require("./player");

class Computer extends Player {
    constructor() {
        super();
        this.name = "Computer";
        this.marker = "c";
        
    }

    makeStep(map) {
        var winNumbers = [7, 56, 448, 73, 146, 292, 273, 84];
        var allowedMoves = map.reduce(function (pv, cv) { return pv.concat(cv) }).map(function (el, i) { return el == 0 ? 1 << (i) : 0 }).filter(function (el) { return el != 0;});
        var bestTurns = [];
        var bestTurn;
        var scoreCombinations = [];
         
        function findBestTurn(aM, wN) {
            for (var index = 0; index < aM.length; index++) {
                var turn = aM[index];
                if (winNumbers.find(el => { return el == turn + wN;})) {
                    bestTurns.push(turn);
                    return true;
                } else {
                    findBestTurn(aM.filter(el => { return turn != el }), turn + wN);
                }
            }
        };
        scoreCombinations.forEach(function(score){
            findBestTurn(allowedMoves, score);
        });
        
        bestTurn = bestTurns.length ? bestTurns[Math.ceil(Math.random() * 1000) % bestTurns.length] : allowedMoves[Math.ceil(Math.random() * 1000) % allowedMoves.length];
        
        scoreCombinations = scoreCombinations.concat(bestTurn, scoreCombinations.map(function (el) { return el + bestTurn}));
        console.log("comb:",scoreCombinations);
        console.log(allowedMoves);
        console.log(bestTurns);
        console.log(bestTurn, this.winNumber);
        console.log({
            x: (Math.log(bestTurn) / Math.log(2)) % 3,
            y: Math.floor((Math.log(bestTurn) / Math.log(2)) / 3)
        })

        this.winNumber += bestTurn;

        this.trigger("makeStep", {
            x: (Math.log(bestTurn) / Math.log(2)) % 3,
            y: Math.floor((Math.log(bestTurn) / Math.log(2)) / 3)
        });
        return;
    }
};



module.exports = Computer;