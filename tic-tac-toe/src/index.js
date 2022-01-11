const View = require("./ttt-view");
const Game = require("../../tic-node-solution/game");

  $( () => {
    const game = new Game();
    $root = $('.ttt');
    new View(game, $root);
  });
