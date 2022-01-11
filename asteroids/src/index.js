const Game = require("./game.js");
const GameView = require("./game_view.js");
window.GameView = GameView;
document.addEventListener("DOMContentLoaded", function(){
    const canvas = document.getElementById("game-canvas");
    canvas.width = Game.DIM_X;
    canvas.height = Game.DIM_Y;
    const ctx = canvas.getContext("2d");
    
  
    g = new GameView(ctx);
    g.start();
    
});
