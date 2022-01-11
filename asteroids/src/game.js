const Asteroid = require("./asteroid");
const Ship = require("./ship");
const Bullet = require("./bullet");

function Game() {
    this.asteroids = [];
    this.ships = [];
    this.bullets = [];
    this.addAsteroids();
};

Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.NUM_ASTEROIDS = 8;

Game.prototype.addAsteroids = function addAsteroids() {
    for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
        asteroid = new Asteroid( { pos: this.randomPosition(), game: this } );
        this.asteroids.push(asteroid);
    }
};

Game.prototype.addShip = function addShip() {
    const ship = new Ship({pos: this.randomPosition(), game: this });
    this.ships.push(ship);
    return ship;
};

Game.prototype.allObjects = function allObjects() {
    return [].concat(this.asteroids, this.ships, this.bullets);
};


Game.prototype.randomPosition = () => {
    return [
        Game.DIM_X * Math.random(),
        Game.DIM_Y * Math.random()
    ];
};

Game.prototype.checkCollisions = function checkCollisions() {
    let objects = this.allObjects();
    for (let i = 0; i < objects.length; i++) {
        for (let j = i + 1; j < objects.length; j++) {
            if (objects[i].isCollidedWith(objects[j])) {
                if (objects[i] instanceof Ship) {
                    objects[j].collideWith(objects[i]);
                } else {
                    objects[i].collideWith(objects[j]);
                }
            }
        }
    }
};

Game.prototype.step = function step() {
   this.moveObjects();
    this.checkCollisions();
};

Game.prototype.isOutOfBounds = function isOutOfBounds(pos) {
    let x = pos[0];
    let y = pos[1];
    if (x > Game.DIM_X) {
        return true;
    } else if (x < 0) {
        return true;
    }
    if (y > Game.DIM_Y) {
        return true;
    } else if (y < 0) {
        return true;
    }

    return false;
};

Game.prototype.remove = function remove(object) {
    if (object instanceof Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof Asteroid) {
      this.asteroids.splice(this.asteroids.indexOf(object), 1);
    } else if (object instanceof Ship) {
      this.ships.splice(this.ships.indexOf(object), 1);
    } else {
      throw new Error("unknown type of object");
    }
};

Game.prototype.draw = function draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    let objects = this.allObjects();
    objects.forEach(el => el.draw(ctx));
};

Game.prototype.moveObjects = function moveObjects(delta) {
    let objects = this.allObjects();
    objects.forEach(function(el) { el.move(delta)});
};

Game.prototype.wrap = function wrap(pos) {
    let x = pos[0];
    let y = pos[1];
    if (x > Game.DIM_X) {
        x = 0;
    } else if (x < 0) {
        x = Game.DIM_X;
    }

    if (y > Game.DIM_Y) {
        y = 0;
    } else if (y < 0) {
        y = Game.DIM_Y;
    }

    return [x, y];
};



module.exports = Game;