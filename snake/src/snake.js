class Snake {
    constructor(board) {
        
        this.direction = "S";
        this.board = board;
        this.segments = [[10, 10], [10, 11], [10, 12]];
    }

    eatApple() {
        if (this.board.apples === []) {
            return false;
        }
        if ((this.head()[0] === this.board.apples[0][0]) && (this.head()[1] === this.board.apples[0][1])) {
            return true;
        }
        return false;
    }

    grow() {
        let deltaX = Snake.DELTAS[this.direction][0];
        let deltaY = Snake.DELTAS[this.direction][1];

        for (let i = 0; i < 3; i++) {
            let newX = this.segments[0][0];
            let newY = this.segments[0][1];
            let newSeg = [deltaX + newX, deltaY + newY];
            this.segments.unshift(newSeg);
        }

    }

    move() {
        const diff = Snake.DELTAS[this.direction];
        const coordX = this.head()[0] + diff[0];
        const coordY = this.head()[1] + diff[1];
        
        this.segments.push([coordX, coordY]);

        this.segments.shift();
    }

    turn(dir) {
        if (!this.isOppositeDir(dir, this.direction)) {
            this.direction = dir;
        }
    }

    isOppositeDir(dir1, dir2) {
        if (dir1 === 'N' && dir2 === 'S' || dir1 === 'S' && dir2 === 'N') {
            return true;
        } else if (dir1 === 'E' && dir2 === 'W' || dir1 === 'W' && dir2 === 'E') {
            return true;
        } 
        return false;
    }

    head() {
        return this.segments.slice(-1)[0];
    }


}

Snake.DELTAS = {
    "N": [-1, 0],
    "S": [1, 0],
    "W": [0, -1],
    "E": [0, 1]
};

module.exports = Snake;