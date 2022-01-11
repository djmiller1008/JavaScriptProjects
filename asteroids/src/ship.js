const Util = require("./util");
const MovingObject = require("./moving_object");
const Game = require("./game");
const Bullet = require("./bullet");

const DEFAULTS = {
    RADIUS: 10,
    COLOR: "blue"
};

function Ship(options) {
    this.radius = DEFAULTS.RADIUS;
    this.color = DEFAULTS.COLOR;
    this.vel = [0, 0];
    this.pos = options.pos;
    this.game = options.game
};

Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function relocate() {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
};

Ship.prototype.fireBullet = function fireBullet() {
    const norm = Util.norm(this.vel);

    if (norm === 0) {
        // Can't fire unless moving.
    return;
    }


    const relVel = Util.scale(
        Util.dir(this.vel),
        15
      );
    
      const bulletVel = [
        relVel[0] + this.vel[0], relVel[1] + this.vel[1]
      ];
    
    const bullet = new Bullet({pos: this.pos, game: this.game, vel: bulletVel});
    this.game.bullets.push(bullet);
};

Ship.prototype.power = function power(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
};



module.exports = Ship;
