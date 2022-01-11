/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/asteroid.js":
/*!*************************!*\
  !*** ./src/asteroid.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\n\nconst DEFAULTS = {\n    COLOR: \"red\",\n    RADIUS: 25,\n    SPEED: 5\n};\n\nfunction Asteroid(options) {\n    this.color = DEFAULTS.COLOR;\n    this.radius = DEFAULTS.RADIUS;\n    this.pos = options.pos;\n    this.vel = Util.randomVec(DEFAULTS.SPEED);\n    new MovingObject(this, options);\n    this.game = options.game;\n};\n\nUtil.inherits(Asteroid, MovingObject);\n\nAsteroid.prototype.collideWith = function collideWith(otherObject) {\n    if (otherObject instanceof Ship) {\n        otherObject.relocate();\n    } else if (otherObject instanceof Bullet) {\n        this.game.remove(otherObject);\n        this.game.remove(this);\n    }\n};\n\n\n\nmodule.exports = Asteroid;\n\n//# sourceURL=webpack:///./src/asteroid.js?");

/***/ }),

/***/ "./src/bullet.js":
/*!***********************!*\
  !*** ./src/bullet.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\nconst DEFAULTS = {\n    RADIUS: 3,\n    COLOR: 'pink'\n}\n\nfunction Bullet(ship) {\n    this.vel = ship.vel;\n    this.radius = DEFAULTS.RADIUS;\n    this.color = DEFAULTS.COLOR;\n    this.pos = ship.pos;\n    this.game = ship.game;\n};\n\nUtil.inherits(Bullet, MovingObject);\n\nBullet.prototype.isWrappable = false;\n\nmodule.exports = Bullet;\n\n//# sourceURL=webpack:///./src/bullet.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Asteroid = __webpack_require__(/*! ./asteroid */ \"./src/asteroid.js\");\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\n\nfunction Game() {\n    this.asteroids = [];\n    this.ships = [];\n    this.bullets = [];\n    this.addAsteroids();\n};\n\nGame.DIM_X = 1000;\nGame.DIM_Y = 600;\nGame.NUM_ASTEROIDS = 8;\n\nGame.prototype.addAsteroids = function addAsteroids() {\n    for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {\n        asteroid = new Asteroid( { pos: this.randomPosition(), game: this } );\n        this.asteroids.push(asteroid);\n    }\n};\n\nGame.prototype.addShip = function addShip() {\n    const ship = new Ship({pos: this.randomPosition(), game: this });\n    this.ships.push(ship);\n    return ship;\n};\n\nGame.prototype.allObjects = function allObjects() {\n    return [].concat(this.asteroids, this.ships, this.bullets);\n};\n\n\nGame.prototype.randomPosition = () => {\n    return [\n        Game.DIM_X * Math.random(),\n        Game.DIM_Y * Math.random()\n    ];\n};\n\nGame.prototype.checkCollisions = function checkCollisions() {\n    let objects = this.allObjects();\n    for (let i = 0; i < objects.length; i++) {\n        for (let j = i + 1; j < objects.length; j++) {\n            if (objects[i].isCollidedWith(objects[j])) {\n                if (objects[i] instanceof Ship) {\n                    objects[j].collideWith(objects[i]);\n                } else {\n                    objects[i].collideWith(objects[j]);\n                }\n            }\n        }\n    }\n};\n\nGame.prototype.step = function step() {\n   this.moveObjects();\n    this.checkCollisions();\n};\n\nGame.prototype.isOutOfBounds = function isOutOfBounds(pos) {\n    let x = pos[0];\n    let y = pos[1];\n    if (x > Game.DIM_X) {\n        return true;\n    } else if (x < 0) {\n        return true;\n    }\n    if (y > Game.DIM_Y) {\n        return true;\n    } else if (y < 0) {\n        return true;\n    }\n\n    return false;\n};\n\nGame.prototype.remove = function remove(object) {\n    if (object instanceof Bullet) {\n      this.bullets.splice(this.bullets.indexOf(object), 1);\n    } else if (object instanceof Asteroid) {\n      this.asteroids.splice(this.asteroids.indexOf(object), 1);\n    } else if (object instanceof Ship) {\n      this.ships.splice(this.ships.indexOf(object), 1);\n    } else {\n      throw new Error(\"unknown type of object\");\n    }\n};\n\nGame.prototype.draw = function draw(ctx) {\n    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);\n    ctx.fillStyle = 'black';\n    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);\n    let objects = this.allObjects();\n    objects.forEach(el => el.draw(ctx));\n};\n\nGame.prototype.moveObjects = function moveObjects(delta) {\n    let objects = this.allObjects();\n    objects.forEach(function(el) { el.move(delta)});\n};\n\nGame.prototype.wrap = function wrap(pos) {\n    let x = pos[0];\n    let y = pos[1];\n    if (x > Game.DIM_X) {\n        x = 0;\n    } else if (x < 0) {\n        x = Game.DIM_X;\n    }\n\n    if (y > Game.DIM_Y) {\n        y = 0;\n    } else if (y < 0) {\n        y = Game.DIM_Y;\n    }\n\n    return [x, y];\n};\n\n\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\nfunction GameView (ctx) {\n    this.game = new Game();\n    this.ctx = ctx;\n    this.ship = this.game.addShip();\n    this.lastTime = 0;\n};\n\nGameView.prototype.animate = function animate(time) {\n    const timeDelta = time - this.lastTime;\n  \n    this.game.step(timeDelta);\n    this.game.draw(this.ctx);\n    this.lastTime = time;\n  \n    // every call to animate requests causes another call to animate\n    requestAnimationFrame(this.animate.bind(this));\n};\n\nGameView.prototype.start = function start() {\n    this.bindKeyHandlers();\n    requestAnimationFrame(this.animate.bind(this));\n};\n\nGameView.prototype.bindKeyHandlers = function bindKeyHandlers() {\n    const ship = this.ship;\n    key(\"up\", function() { ship.power([0, -1])});\n    key(\"right\", function() { ship.power([1, 0])});\n    key(\"left\", function() { ship.power([-1, 0])});\n    key(\"down\", function() { ship.power([0, 1])});\n\n\n    key(\"space\", function () { ship.fireBullet(); });\n};\nmodule.exports = GameView;\n\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\nconst GameView = __webpack_require__(/*! ./game_view.js */ \"./src/game_view.js\");\nwindow.GameView = GameView;\ndocument.addEventListener(\"DOMContentLoaded\", function(){\n    const canvas = document.getElementById(\"game-canvas\");\n    canvas.width = Game.DIM_X;\n    canvas.height = Game.DIM_Y;\n    const ctx = canvas.getContext(\"2d\");\n    \n  \n    g = new GameView(ctx);\n    g.start();\n    \n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nfunction MovingObject(options) {\n    this.pos = options.pos;\n    this.vel = options.vel;\n    this.radius = options.radius;\n    this.color = options.color;\n    this.game = options.game;\n}\n\nMovingObject.prototype.draw = function draw(ctx) {\n    ctx.beginPath();\n    ctx.fillStyle = this.color;\n    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);\n    ctx.fill();\n    ctx.stroke();\n};\n\nMovingObject.prototype.move = function move(timeDelta = 1) {\n    this.pos[0] += (this.vel[0] * timeDelta);\n    this.pos[1] += (this.vel[1] * timeDelta);\n\n    if (this.game.isOutOfBounds(this.pos)) {\n        if (this.isWrappable) {\n            this.pos = this.game.wrap(this.pos);\n        } else {\n            this.game.remove(this);  \n        }\n    }\n    this.pos = this.game.wrap(this.pos);\n   \n};\n\nMovingObject.prototype.isCollidedWith = function isCollidedWith(otherObject) {\n    let radiusSum = this.radius + otherObject.radius;\n    let dist = Util.dist(this.pos, otherObject.pos);\n    return dist < radiusSum;\n};\n\nMovingObject.prototype.isWrappable = true;\n\n\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\n\nconst DEFAULTS = {\n    RADIUS: 10,\n    COLOR: \"blue\"\n};\n\nfunction Ship(options) {\n    this.radius = DEFAULTS.RADIUS;\n    this.color = DEFAULTS.COLOR;\n    this.vel = [0, 0];\n    this.pos = options.pos;\n    this.game = options.game\n};\n\nUtil.inherits(Ship, MovingObject);\n\nShip.prototype.relocate = function relocate() {\n    this.pos = this.game.randomPosition();\n    this.vel = [0, 0];\n};\n\nShip.prototype.fireBullet = function fireBullet() {\n    const norm = Util.norm(this.vel);\n\n    if (norm === 0) {\n        // Can't fire unless moving.\n    return;\n    }\n\n\n    const relVel = Util.scale(\n        Util.dir(this.vel),\n        15\n      );\n    \n      const bulletVel = [\n        relVel[0] + this.vel[0], relVel[1] + this.vel[1]\n      ];\n    \n    const bullet = new Bullet({pos: this.pos, game: this.game, vel: bulletVel});\n    this.game.bullets.push(bullet);\n};\n\nShip.prototype.power = function power(impulse) {\n    this.vel[0] += impulse[0];\n    this.vel[1] += impulse[1];\n};\n\n\n\nmodule.exports = Ship;\n\n\n//# sourceURL=webpack:///./src/ship.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((module) => {

eval("const Util = {\n    inherits(child, parent) {\n        function Surrogate() {};\n        Surrogate.prototype = parent.prototype;\n\n        child.prototype = new Surrogate();\n        child.prototype.constructor = child;\n    },\n\n    randomVec(length) {\n        const deg = 2 * Math.PI * Math.random();\n        return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n    },\n      // Scale the length of a vector by the given amount.\n    scale(vec, m) {\n        return [vec[0] * m, vec[1] * m];\n    },\n\n    dist(posX, posY) {\n        let x = posX;\n        let y = posY;\n        return Math.sqrt(((x[0] - y[0]) ** 2) + ((x[1] - y[1]) ** 2))\n    },\n    \n    norm(vec) {\n        return Util.dist([0, 0], vec);\n    },\n    \n    dir(vec) {\n        const norm = Util.norm(vec);\n        return Util.scale(vec, 1 / norm);\n    }\n    };\n\n\n\nmodule.exports = Util;\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;