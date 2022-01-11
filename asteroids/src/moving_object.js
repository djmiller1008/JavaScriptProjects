const Game = require("./game");
const Util = require("./util");

function MovingObject(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
}

MovingObject.prototype.draw = function draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
};

MovingObject.prototype.move = function move(timeDelta = 1) {
    this.pos[0] += (this.vel[0] * timeDelta);
    this.pos[1] += (this.vel[1] * timeDelta);

    if (this.game.isOutOfBounds(this.pos)) {
        if (this.isWrappable) {
            this.pos = this.game.wrap(this.pos);
        } else {
            this.game.remove(this);  
        }
    }
    this.pos = this.game.wrap(this.pos);
   
};

MovingObject.prototype.isCollidedWith = function isCollidedWith(otherObject) {
    let radiusSum = this.radius + otherObject.radius;
    let dist = Util.dist(this.pos, otherObject.pos);
    return dist < radiusSum;
};

MovingObject.prototype.isWrappable = true;



module.exports = MovingObject;