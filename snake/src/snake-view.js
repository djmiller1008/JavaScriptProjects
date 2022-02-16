const Board = require("./board");
const Snake = require("./snake");
const Apple = require("./apple");
class View {
    constructor($el) {
        this.$el = $el;
        this.board = new Board(25);
        this.setupBoard();
        this.board.placeApple();

        this.interval = window.setInterval(
            this.step.bind(this),
            200
        );

        $(window).on("keydown", this.handleKeyEvent.bind(this));
    }

    handleKeyEvent(event) {
        console.log(event)
        if (View.KEYS[event.keyCode]) {
            this.board.snake.turn(View.KEYS[event.keyCode]);
        }
    }

    step() {
        this.board.snake.move();
        this.counter++;
        if (!this.board.validMove(this.board.snake.head())) {
            alert('Game Over!');
            window.clearInterval(this.interval);
        }
        
        if (this.board.snake.eatApple()) {
            this.board.snake.grow();
            this.board.removeApple();
            this.board.placeApple();
            
        }

        this.render();
        

    }

    setupBoard() {
        for (let i = 0; i < this.board.dim; i++) {
            const $ul = $("<ul></ul>");
            for (let j = 0; j < this.board.dim; j++) {
                const $li = $("<li></li>");
                $ul.append($li);
            }
            this.$el.append($ul);
        }
    }


    render() {
        $('li').filter(`.snake-part`).removeClass();
        $('li').filter('.apple').removeClass();

        const snakeCoords = this.board.snake.segments;
        snakeCoords.forEach(coord => {
            let $li = $('li').eq((coord[0] * this.board.dim) + coord[1]);
            $li.addClass("snake-part");
        })
        
        const appleCoords = this.board.apples;
        appleCoords.forEach(coord => {
            let $li = $('li').eq((coord[0] * this.board.dim) + coord[1]);
            $li.addClass("apple");
        })
    }
}

View.KEYS = {
    38: "N",
    39: "E",
    40: "S",
    37: "W"
};

module.exports = View;