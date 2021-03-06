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

/***/ "./src/hanoi-view.js":
/*!***************************!*\
  !*** ./src/hanoi-view.js ***!
  \***************************/
/***/ ((module) => {

eval("class HanoiView {\n    constructor(game, $el) {\n        this.game = game;\n        this.$el = $el;\n        this.setupTowers();\n        this.render();\n\n        this.fromTowerIdx = null;\n\n        $('ul').on(\"click\" , this.clickTower.bind(this));\n\n        \n    }\n\n    clickTower(event) {\n        \n        const $towerIdx = $(event.currentTarget).index();\n\n        if (this.fromTowerIdx === null) {\n            $(event.currentTarget).toggleClass(\"clicked\");\n            this.fromTowerIdx = $towerIdx;\n        } else {\n            if (!this.game.move(this.fromTowerIdx, $towerIdx)) {\n                alert(\"Invalid Move! Try again!\")\n            };\n            this.fromTowerIdx = null;\n\n            this.render();\n        }\n\n        if (this.game.isWon()) {\n            this.$el.off('click');\n            $(event.currentTarget).children().toggleClass('winner');\n            alert(\"Great Job!\");\n           \n        }\n\n    }\n\n    setupTowers() {\n        for (let i = 0; i < 3; i++) {\n            const ul$ = $('<ul></ul>');\n            this.$el.append(ul$);\n\n            for (let j = 0; j < 3; j++) {\n                const li$ = $('<li></li>');\n                ul$.append(li$);\n            }\n        }\n\n    }\n\n    render() {\n        const $towers = $('ul');\n        $towers.removeClass();\n        this.game.towers.forEach((disks, towerIdx) => {\n            const $disks = $towers.eq(towerIdx).children();\n            $disks.removeClass();\n      \n            disks.forEach((diskWidth, diskIdx) => {\n              /*\n              Since our disks are stacked from bottom to top\n              as [3, 2, 1], we have to select from the back\n              of our jQuery object, using negative indices.\n              */\n              $disks.eq(-1 * (diskIdx + 1)).addClass(`disk-${diskWidth}`);\n            });\n        });\n        \n        \n    }\n}\n\nmodule.exports = HanoiView;\n\n//# sourceURL=webpack:///./src/hanoi-view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const HanoiGame = __webpack_require__(/*! ../../hanoi_solution/game */ \"../hanoi_solution/game.js\");\nconst HanoiView = __webpack_require__(/*! ./hanoi-view */ \"./src/hanoi-view.js\");\n\n$(() => {\n  const rootEl = $('.hanoi');\n  const game = new HanoiGame();\n  new HanoiView(game, rootEl);\n  \n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "../hanoi_solution/game.js":
/*!*********************************!*\
  !*** ../hanoi_solution/game.js ***!
  \*********************************/
/***/ ((module) => {

eval("class Game {\n  constructor() {\n    this.towers = [[3, 2, 1], [], []];\n  }\n\n  isValidMove(startTowerIdx, endTowerIdx) {\n      const startTower = this.towers[startTowerIdx];\n      const endTower = this.towers[endTowerIdx];\n\n      if (startTower.length === 0) {\n        return false;\n      } else if (endTower.length == 0) {\n        return true;\n      } else {\n        const topStartDisc = startTower[startTower.length - 1];\n        const topEndDisc = endTower[endTower.length - 1];\n        return topStartDisc < topEndDisc;\n      }\n  }\n\n  isWon() {\n      // move all the discs to the last or second tower\n      return (this.towers[2].length == 3) || (this.towers[1].length == 3);\n  }\n\n  move(startTowerIdx, endTowerIdx) {\n      if (this.isValidMove(startTowerIdx, endTowerIdx)) {\n        this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());\n        return true;\n      } else {\n        return false;\n      }\n  }\n\n  print() {\n      console.log(JSON.stringify(this.towers));\n  }\n\n  promptMove(reader, callback) {\n      this.print();\n      reader.question(\"Enter a starting tower: \", start => {\n        const startTowerIdx = parseInt(start);\n        reader.question(\"Enter an ending tower: \", end => {\n          const endTowerIdx = parseInt(end);\n          callback(startTowerIdx, endTowerIdx);\n        });\n      });\n  }\n\n  run(reader, gameCompletionCallback) {\n      this.promptMove(reader, (startTowerIdx, endTowerIdx) => {\n        if (!this.move(startTowerIdx, endTowerIdx)) {\n          console.log(\"Invalid move!\");\n        }\n\n        if (!this.isWon()) {\n          // Continue to play!\n          this.run(reader, gameCompletionCallback);\n        } else {\n          this.print();\n          console.log(\"You win!\");\n          gameCompletionCallback();\n        }\n      });\n  }\n}\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///../hanoi_solution/game.js?");

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