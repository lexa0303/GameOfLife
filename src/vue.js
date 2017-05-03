/**
 * Created by alex on 03.05.17.
 */

let GameOfLife = function () {
    this.cells = [];
    this.active = false;
    this.cells_count = 0;
    this.Init(200);
};

GameOfLife.prototype.Init = function (cells_count) {
    let j, i, row, cell;
    let self = this;

    for (i = 1; i <= cells_count; i++) {
        for (j = 1; j <= cells_count; j++) {
            cell = new Cell(i, j);
            self.cells.push(cell);
            self.cells_count++;
        }
    }
    self.Simulate();
};

GameOfLife.prototype.Simulate = function () {
    let self = this;
    setInterval(function () {
        if (self.active !== true){
            return false;
        }
        console.log("sim");
        let i;
        self.toKill = [];
        self.toAlive = [];
        for (i in self.cells) {
            if (self.cells.hasOwnProperty(i)) {
                self.CheckCell(self.cells[i]);
            }
        }
        self.toKill.forEach(function(el){
            el.isAlive = false;
        });
        self.toAlive.forEach(function(el){
            el.isAlive = true;
        });
    }, 100);
};

GameOfLife.prototype.CheckCell = function (cell) {
    let self = this;
    let arAdjacent = self.GetAliveAdjacent(cell.x, cell.y);
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

GameOfLife.prototype.GetAliveAdjacent = function (x, y) {
    x = parseInt(x);
    y = parseInt(y);
    let arAdjacent = [];
    let cell;
    if (cell = this.GetCell(x - 1, y - 1)) {
        if (cell.isAlive) {
            arAdjacent.push(cell);
        }
    }
    if (cell = this.GetCell(x - 1, y)) {
        if (cell.isAlive) {
            arAdjacent.push(cell);
        }
    }
    if (cell = this.GetCell(x - 1, y + 1)) {
        if (cell.isAlive) {
            arAdjacent.push(cell);
        }
    }
    if (cell = this.GetCell(x, y - 1)) {
        if (cell.isAlive) {
            arAdjacent.push(cell);
        }
    }
    if (cell = this.GetCell(x, y + 1)) {
        if (cell.isAlive) {
            arAdjacent.push(cell);
        }
    }
    if (cell = this.GetCell(x + 1, y - 1)) {
        if (cell.isAlive) {
            arAdjacent.push(cell);
        }
    }
    if (cell = this.GetCell(x + 1, y)) {
        if (cell.isAlive) {
            arAdjacent.push(cell);
        }
    }
    if (cell = this.GetCell(x + 1, y + 1)) {
        if (cell.isAlive) {
            arAdjacent.push(cell);
        }
    }

    return arAdjacent;
};

GameOfLife.prototype.GetCell = function (x, y) {
    let res;
    this.cells.forEach(function(el){
        if (el.x === x && el.y === y){
            res = el;
        }
    });

    return (res === undefined) ? res : false;
};

let Cell = function (x, y) {
    let cell = {};

    cell.x = x;
    cell.y = y;
    cell.style = `top: ${x * 10}px; left: ${y * 10}px`;
    cell.isAlive = false;

    return cell;
};

let Game = new GameOfLife();

let app = new Vue({
    el: "#container",
    data: {
        cells: Game.cells
    },
    methods: {
        switchAlive : function(el){
            el.isAlive = !el.isAlive
        }
    }
});