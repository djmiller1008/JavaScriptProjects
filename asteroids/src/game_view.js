const Game = require("./game");

function GameView (ctx) {
    this.game = new Game();
    this.ctx = ctx;
    this.ship = this.game.addShip();
    this.lastTime = 0;
};

GameView.prototype.animate = function animate(time) {
    const timeDelta = time - this.lastTime;
  
    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;
  
    // every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.start = function start() {
    this.bindKeyHandlers();
    requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.bindKeyHandlers = function bindKeyHandlers() {
    const ship = this.ship;
    key("up", function() { ship.power([0, -1])});
    key("right", function() { ship.power([1, 0])});
    key("left", function() { ship.power([-1, 0])});
    key("down", function() { ship.power([0, 1])});


    key("space", function () { ship.fireBullet(); });
};
module.exports = GameView;
