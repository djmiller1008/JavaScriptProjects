const Util = require("./util");
const MovingObject = require("./moving_object");
const Game = require("./game");

const DEFAULTS = {
    RADIUS: 3,
    COLOR: 'pink'
}

function Bullet(ship) {
    this.vel = ship.vel;
    this.radius = DEFAULTS.RADIUS;
    this.color = DEFAULTS.COLOR;
    this.pos = ship.pos;
    this.game = ship.game;
};

Util.inherits(Bullet, MovingObject);

Bullet.prototype.isWrappable = false;

module.exports = Bullet;