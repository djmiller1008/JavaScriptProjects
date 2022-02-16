class Apple {
    constructor(board) {
        this.board = board;
        this.addApple();
    }

    addApple() {
        let x = Math.floor(Math.random() * this.board.dim);
        let y = Math.floor(Math.random() * this.board.dim);

        let snake = this.board.snake.segments;

        if (snake.includes([x, y])) {
            this.addApple();
        } else {
            this.position = [x, y];
        }
    }
}

module.exports = Apple;