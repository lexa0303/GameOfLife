/**
 * Created by alex on 03.05.17.
 */

let totalCells = 0;

let GameOfLife = function (container) {
    this.container = document.createElement("div");
    this.container.id = "main";
    this.cells = {};
    this.activeCells = {};
    this.active = false;
    this.cells_count = 200;

    this.Handlers();
    // this.Init(200);
};

GameOfLife.prototype.Handlers = function(){
    var self = this;
    document.querySelector("#init").addEventListener("click", function(e){
        e.preventDefault();
        self.Init(self.cells_count);
        this.style.display = "none!important;";
    });
};

GameOfLife.prototype.Init = function (cells_count) {
    let j, i, row, cell;
    let self = this;

    for (i = 1; i <= cells_count; i++) {
        if (self.cells[i] === undefined) {
            self.cells[i] = {};
        }

        row = self.cells[i];

        for (j = 1; j <= cells_count; j++) {
            cell = new Cell(i, j);
            row[j] = cell;
            self.activeCells[cell.cell.dataset.number] = cell;
            self.container.appendChild(row[j].cell);
        }
    }

    document.querySelector("#container").appendChild(this.container);

    // self.Simulate();
};

GameOfLife.prototype.Simulate = function () {
    let self = this;
    setInterval(function () {
        if (self.active !== true){
            return false;
        }
        let i, cell;
        self.toKill = [];
        self.toAlive = [];
        for (i in self.activeCells) {
            if (self.activeCells.hasOwnProperty(i)) {
                self.CheckCell(self.activeCells[i]);
            }
        }
        self.toKill.forEach(function(el){
            el.Kill();
        });
        self.toAlive.forEach(function(el){
            el.Alive();
        });
    }, 100);
};

GameOfLife.prototype.CheckCell = function (cell) {
    let self = this;
    let arAdjacent = self.GetAliveAdjacent(cell.cell.dataset.x, cell.cell.dataset.y);
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
    if (this.cells[x] !== undefined) {
        if (this.cells[x][y] !== undefined) {
            return this.cells[x][y];
        } else {
            return false;
        }
    } else {
        return false;
    }
};

GameOfLife.prototype.Controls = function(){

};

let Cell = function (x, y) {
    let self = this;
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.classList.add("dead");
    cell.dataset.x = x;
    cell.dataset.y = y;
    cell.style.top = (x * 10) + "px";
    cell.style.left = (y * 10) + "px";
    cell.dataset.number = ++totalCells;

    self.isAlive = false;

    cell.addEventListener("click", function (e) {
        e.preventDefault();
        self.SwitchState();
    });

    self.cell = cell;
};

Cell.prototype.SwitchState = function () {
    if (this.isAlive) {
        this.Kill();
    } else {
        this.Alive();
    }
};

Cell.prototype.Alive = function () {
    this.isAlive = true;
    this.cell.classList.remove("dead");
    this.cell.classList.add("alive");
};

Cell.prototype.Kill = function () {
    this.isAlive = false;
    this.cell.classList.add("dead");
    this.cell.classList.remove("alive");
};

(function(){
    document.addEventListener("click", function(e){
        let target = e.target;
        if (target.classList.contains("show-controls")){
            target.classList.toggle("active");
            document.querySelector(".controls_wrap").classList.toggle("active");
        }
    });
})();