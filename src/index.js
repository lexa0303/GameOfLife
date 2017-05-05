/**
 * Created by alex on 03.05.17.
 */

var Vue = require('vue');
var VueDefaultValue = require('vue-default-value');

Vue.use(VueDefaultValue);

let GameOfLife = function () {
    this.cells = {};
    this.aliveCells = {};
    this.cellsXY = {};
    this.active = false;
    this.cells_count = 0;
    this.speed_of_life = 500;
    this.Init(100);
};


GameOfLife.prototype.Init = function (cells_count) {
    let j, i, row, cell;
    let self = this;

    for (i = 1; i <= cells_count; i++) {
        if (self.cellsXY[i] === undefined) {
            self.cellsXY[i] = {};
        }

        for (j = 1; j <= cells_count; j++) {
            cell = new Cell(i, j);
            self.cells[cell.number] = cell;
            self.cellsXY[i][j] = cell;
            self.cells_count++;
        }
    }
    self.Simulate();
};

GameOfLife.prototype.Simulate = function () {
    let self = this;
    clearInterval(self.interval);
    self.interval = setInterval(function () {
        if (self.active !== true){
            return false;
        }
        let i;
        self.toKill = [];
        self.toAlive = [];
        for (i in self.aliveCells) {
            if (self.aliveCells.hasOwnProperty(i)) {
                self.CheckCell(self.aliveCells[i], true);
            }
        }
        self.toKill.forEach(function(el){
            el.isAlive = false;
            delete self.aliveCells[el.number];
        });
        self.toAlive.forEach(function(el){
            el.isAlive = true;
            self.aliveCells[el.number] = el;
        });
    }, self.speed_of_life);
};

GameOfLife.prototype.CheckCell = function (cell, spread = false) {
    let self = this;
    let arAdjacent = self.GetAliveAdjacent(cell.x, cell.y, spread);
    let count = arAdjacent.length;

    if (cell.isAlive) {
        switch (count) {
            case 0:
            case 1:
                self.toKill.push(cell);
                break;
            case 2:
            case 3:
                break;
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
                self.toKill.push(cell);
                break;
        }
    } else {
        if (count === 3) {
            self.toAlive.push(cell);
        }
    }
};

GameOfLife.prototype.GetAliveAdjacent = function (x, y, spread) {
    let self = this;
    x = parseInt(x);
    y = parseInt(y);
    let arAdjacent = [];
    let cell;
    if (cell = this.GetCell(x - 1, y - 1)) {
        if (cell.isAlive) {
            arAdjacent.push(cell);
        } else {
            if (spread) {
                self.CheckCell(cell);
            }
        }
    }
    if (cell = this.GetCell(x - 1, y)) {
        if (cell.isAlive) {
            arAdjacent.push(cell);
        } else {
            if (spread) {
                self.CheckCell(cell);
            }
        }
    }
    if (cell = this.GetCell(x - 1, y + 1)) {
        if (cell.isAlive) {
            arAdjacent.push(cell);
        } else {
            if (spread) {
                self.CheckCell(cell);
            }
        }
    }
    if (cell = this.GetCell(x, y - 1)) {
        if (cell.isAlive) {
            arAdjacent.push(cell);
        } else {
            if (spread) {
                self.CheckCell(cell);
            }
        }
    }
    if (cell = this.GetCell(x, y + 1)) {
        if (cell.isAlive) {
            arAdjacent.push(cell);
        } else {
            if (spread) {
                self.CheckCell(cell);
            }
        }
    }
    if (cell = this.GetCell(x + 1, y - 1)) {
        if (cell.isAlive) {
            arAdjacent.push(cell);
        } else {
            if (spread) {
                self.CheckCell(cell);
            }
        }
    }
    if (cell = this.GetCell(x + 1, y)) {
        if (cell.isAlive) {
            arAdjacent.push(cell);
        } else {
            if (spread) {
                self.CheckCell(cell);
            }
        }
    }
    if (cell = this.GetCell(x + 1, y + 1)) {
        if (cell.isAlive) {
            arAdjacent.push(cell);
        } else {
            if (spread) {
                self.CheckCell(cell);
            }
        }
    }

    return arAdjacent;
};

GameOfLife.prototype.GetCell = function (x, y) {
    let res;
    if (x >= this.cells_count || y >= this.cells_count || x<=0 || y<=0){
        return false;
    }
    return this.cellsXY[x][y];
};

let totalCells = 0;

let Cell = function (x, y, alive = false) {
    let cell = {};

    cell.x = x;
    cell.y = y;
    cell.style = `top: ${x * 10}px; left: ${y * 10}px`;
    cell.isAlive = alive;
    cell.number = ++totalCells;

    return cell;
};

let Game = new GameOfLife();

let app = new Vue({
    el: "#container",
    data: {
        cells: Game.cells,
        aliveCells: Game.aliveCells,
        game: Game
    },
    methods: {
        switchAlive : function(el){
            el.isAlive = !el.isAlive;
            if (el.isAlive){
                this.aliveCells[el.number] = el;
            } else {
                delete this.aliveCells[el.number];
            }
        },
        start: function(){
            this.game.active = true;
        },
        stop: function(){
            this.game.active = false;
        },
        changeSpeed: function(e){
            this.game.speed_of_life = e.target.value;
            this.game.Simulate();
        }
    }
});

(function(){
    document.addEventListener("click", function(e){
        let target = e.target;
        if (target.classList.contains("show-controls")){
            target.closest(".controls_wrap").classList.toggle("active");
        }
    });
})();