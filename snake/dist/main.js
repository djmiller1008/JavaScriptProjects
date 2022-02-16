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

/***/ "./src/apple.js":
/*!**********************!*\
  !*** ./src/apple.js ***!
  \**********************/
/***/ ((module) => {

eval("class Apple {\n    constructor(board) {\n        this.board = board;\n        this.addApple();\n    }\n\n    addApple() {\n        let x = Math.floor(Math.random() * this.board.dim);\n        let y = Math.floor(Math.random() * this.board.dim);\n\n        let snake = this.board.snake.segments;\n\n        if (snake.includes([x, y])) {\n            this.addApple();\n        } else {\n            this.position = [x, y];\n        }\n    }\n}\n\nmodule.exports = Apple;\n\n//# sourceURL=webpack:///./src/apple.js?");

/***/ }),

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Apple = __webpack_require__(/*! ./apple */ \"./src/apple.js\");\nconst Snake = __webpack_require__(/*! ./snake */ \"./src/snake.js\");\n\n\nclass Board {\n    constructor(dim) {\n        this.dim = dim;\n        this.snake = new Snake(this);\n        this.apples = [];\n    }\n\n    setupBoard() {\n        const grid = [];\n        for (let i = 0; i < this.dim; i++) {\n            let row = [];\n            for (let j = 0; j < this.dim; j++) {\n                row.push(\".\")\n            }\n            grid.push(row);\n        }\n        return grid;\n    }\n\n    placeApple() {\n        let apple = new Apple(this);\n        this.apples.push(apple.position);\n    }\n\n    removeApple() {\n        this.apples.shift();\n    }\n\n    validMove(pos) {\n        let x = pos[0];\n        let y = pos[1];\n\n        if (x >= this.dim || x < 0) {\n            return false;\n        } else if (y >= this.dim || y < 0) {\n            return false;\n        } else {\n            return true;\n        }\n    } \n}\n\nmodule.exports = Board;\n\n//# sourceURL=webpack:///./src/board.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const View = __webpack_require__(/*! ./snake-view */ \"./src/snake-view.js\");\n\n$(() => {\n    const rootEl$ = $('.snake');\n    new View(rootEl$);\n})\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/snake-view.js":
/*!***************************!*\
  !*** ./src/snake-view.js ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Board = __webpack_require__(/*! ./board */ \"./src/board.js\");\nconst Snake = __webpack_require__(/*! ./snake */ \"./src/snake.js\");\nconst Apple = __webpack_require__(/*! ./apple */ \"./src/apple.js\");\nclass View {\n    constructor($el) {\n        this.$el = $el;\n        this.board = new Board(25);\n        this.setupBoard();\n        this.board.placeApple();\n\n        this.interval = window.setInterval(\n            this.step.bind(this),\n            200\n        );\n\n        $(window).on(\"keydown\", this.handleKeyEvent.bind(this));\n    }\n\n    handleKeyEvent(event) {\n        console.log(event)\n        if (View.KEYS[event.keyCode]) {\n            this.board.snake.turn(View.KEYS[event.keyCode]);\n        }\n    }\n\n    step() {\n        this.board.snake.move();\n        this.counter++;\n        if (!this.board.validMove(this.board.snake.head())) {\n            alert('Game Over!');\n            window.clearInterval(this.interval);\n        }\n        \n        if (this.board.snake.eatApple()) {\n            this.board.snake.grow();\n            this.board.removeApple();\n            this.board.placeApple();\n            \n        }\n\n        this.render();\n        \n\n    }\n\n    setupBoard() {\n        for (let i = 0; i < this.board.dim; i++) {\n            const $ul = $(\"<ul></ul>\");\n            for (let j = 0; j < this.board.dim; j++) {\n                const $li = $(\"<li></li>\");\n                $ul.append($li);\n            }\n            this.$el.append($ul);\n        }\n    }\n\n\n    render() {\n        $('li').filter(`.snake-part`).removeClass();\n        $('li').filter('.apple').removeClass();\n\n        const snakeCoords = this.board.snake.segments;\n        snakeCoords.forEach(coord => {\n            let $li = $('li').eq((coord[0] * this.board.dim) + coord[1]);\n            $li.addClass(\"snake-part\");\n        })\n        \n        const appleCoords = this.board.apples;\n        appleCoords.forEach(coord => {\n            let $li = $('li').eq((coord[0] * this.board.dim) + coord[1]);\n            $li.addClass(\"apple\");\n        })\n    }\n}\n\nView.KEYS = {\n    38: \"N\",\n    39: \"E\",\n    40: \"S\",\n    37: \"W\"\n};\n\nmodule.exports = View;\n\n//# sourceURL=webpack:///./src/snake-view.js?");

/***/ }),

/***/ "./src/snake.js":
/*!**********************!*\
  !*** ./src/snake.js ***!
  \**********************/
/***/ ((module) => {

eval("class Snake {\n    constructor(board) {\n        \n        this.direction = \"S\";\n        this.board = board;\n        this.segments = [[10, 10], [10, 11], [10, 12]];\n    }\n\n    eatApple() {\n        if (this.board.apples === []) {\n            return false;\n        }\n        if ((this.head()[0] === this.board.apples[0][0]) && (this.head()[1] === this.board.apples[0][1])) {\n            return true;\n        }\n        return false;\n    }\n\n    grow() {\n        let deltaX = Snake.DELTAS[this.direction][0];\n        let deltaY = Snake.DELTAS[this.direction][1];\n\n        for (let i = 0; i < 3; i++) {\n            let newX = this.segments[0][0];\n            let newY = this.segments[0][1];\n            let newSeg = [deltaX + newX, deltaY + newY];\n            this.segments.unshift(newSeg);\n        }\n\n    }\n\n    move() {\n        const diff = Snake.DELTAS[this.direction];\n        const coordX = this.head()[0] + diff[0];\n        const coordY = this.head()[1] + diff[1];\n        \n        this.segments.push([coordX, coordY]);\n\n        this.segments.shift();\n    }\n\n    turn(dir) {\n        if (!this.isOppositeDir(dir, this.direction)) {\n            this.direction = dir;\n        }\n    }\n\n    isOppositeDir(dir1, dir2) {\n        if (dir1 === 'N' && dir2 === 'S' || dir1 === 'S' && dir2 === 'N') {\n            return true;\n        } else if (dir1 === 'E' && dir2 === 'W' || dir1 === 'W' && dir2 === 'E') {\n            return true;\n        } \n        return false;\n    }\n\n    head() {\n        return this.segments.slice(-1)[0];\n    }\n\n\n}\n\nSnake.DELTAS = {\n    \"N\": [-1, 0],\n    \"S\": [1, 0],\n    \"W\": [0, -1],\n    \"E\": [0, 1]\n};\n\nmodule.exports = Snake;\n\n//# sourceURL=webpack:///./src/snake.js?");

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