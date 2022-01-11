const HanoiGame = require("../../hanoi_solution/game");
const HanoiView = require("./hanoi-view");

$(() => {
  const rootEl = $('.hanoi');
  const game = new HanoiGame();
  new HanoiView(game, rootEl);
  
});
