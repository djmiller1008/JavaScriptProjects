const Util = require("./util");
const MovingObject = require("./moving_object");
const Ship = require("./ship");
const Bullet = require("./bullet");

const DEFAULTS = {
    COLOR: "red",
    RADIUS: 25,
    SPEED: 5
};

function Asteroid(options) {
    this.color = DEFAULTS.COLOR;
    this.radius = DEFAULTS.RADIUS;
    this.pos = options.pos;
    this.vel = Util.randomVec(DEFAULTS.SPEED);
    new MovingObject(this, options);
    this.game = options.game;
};

Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.collideWith = function collideWith(otherObject) {
    if (otherObject instanceof Ship) {
        otherObject.relocate();
    } else if (otherObject instanceof Bullet) {
        this.game.remove(otherObject);
        this.game.remove(this);
    }
};



module.exports = Asteroid;