var Player = require("./player");

class Computer extends Player {
    constructor() {
        super();
        this.name = "Computer";
        this.marker = "c";
        this.scoreCombinations = [];
    }

    makeStep(map) {
        var winNumbers = [7, 56, 448, 73, 146, 292, 273, 84];
        var allowedMoves = map
            .reduce(function (pv, cv) { return pv.concat(cv) })
            .map(function (el, i) { return el == 0 ? 1 << (i) : 0 })
            .filter(function (el) { return el != 0;});
                            
        var bestTurns = [];
        var bestTurn;
         
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

        this.scoreCombinations.forEach(function(score){
            findBestTurn(allowedMoves, score);
        });
        
        bestTurn = bestTurns.length ? bestTurns[0] : allowedMoves[Math.ceil(Math.random() * 1000) % allowedMoves.length];
        
        this.scoreCombinations = this.scoreCombinations
            .concat(bestTurn, this.scoreCombinations.map(function (el) { return el + bestTurn}))
            .sort(function (a,b){return a < b;});

        this.trigger("makeStep", {
            x: (Math.log(bestTurn) / Math.log(2)) % 3, 
            y: Math.floor((Math.log(bestTurn) / Math.log(2)) / 3)
        });
    }
};

module.exports = Computer;