const Apple = require("./apple");
const Snake = require("./snake");


class Board {
    constructor(dim) {
        this.dim = dim;
        this.snake = new Snake(this);
        this.apples = [];
    }

    setupBoard() {
        const grid = [];
        for (let i = 0; i < this.dim; i++) {
            let row = [];
            for (let j = 0; j < this.dim; j++) {
                row.push(".")
            }
            grid.push(row);
        }
        return grid;
    }

    placeApple() {
        let apple = new Apple(this);
        this.apples.push(apple.position);
    }

    removeApple() {
        this.apples.shift();
    }

    validMove(pos) {
        let x = pos[0];
        let y = pos[1];

        if (x >= this.dim || x < 0) {
            return false;
        } else if (y >= this.dim || y < 0) {
            return false;
        } else {
            return true;
        }
    } 
}

module.exports = Board;