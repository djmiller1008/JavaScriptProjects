class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    this.$el.on('click', 'li', event => {
      const $square = $(event.currentTarget);
      this.makeMove($square);
    })

    $('button').on('click', event => {
      this.refreshPage();
    })
  }

  makeMove($square) {
    this.game.playMove($square.data('pos'));
    if (this.game.currentPlayer === 'o') {
      $square.addClass('x');
    } else {
      $square.addClass('o');
    }

    if (this.game.isOver()) {
      this.$el.off("click");

      if (this.game.board.winner()) {
        this.game.swapTurn();
        const $message = $('<p></p>');
        const winner = this.game.currentPlayer;
        $message.text(winner.toUpperCase() + " is the winner!");

        $('figure').after($message);
      } else {
        const $message = $('<p></p>').text("It's a draw!");
        $('figure').after($message);
      }
    }
  }

  setupBoard() {
    const $ul = $('<ul></ul>')
    this.$el.append($ul);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const $li = $('<li></li>');
        $li.data("pos", [i, j]); 
        $ul.append($li);
      }
    }
  }

  refreshPage() {
    window.location.reload();
  }


}

module.exports = View;
