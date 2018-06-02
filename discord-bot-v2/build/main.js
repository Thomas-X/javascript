require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classes_Bot__ = __webpack_require__(2);


__webpack_require__(9).config();

const bot = new __WEBPACK_IMPORTED_MODULE_0__classes_Bot__["a" /* default */](process.env.DISCORD_BOT_TOKEN);
/* harmony export (immutable) */ __webpack_exports__["bot"] = bot;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_discord_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_discord_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_discord_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__(5);




class Bot {
    constructor(token) {
        this._client = new __WEBPACK_IMPORTED_MODULE_1_discord_js___default.a.Client();
        this._client.login(token);
        this._client.on('ready', () => {
            console.log(`Logged in as ${this._client.user.tag}`);
        });
        __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.connect('mongodb://localhost:27017/discord-bot');
        this.clientMessageListener = func => this._client.on('message', func);
        this.listen();
        this._token = token;
    }

    listen() {
        try {
            this.clientMessageListener(async msg => {
                await Object(__WEBPACK_IMPORTED_MODULE_2__constants__["a" /* commandParser */])(msg.content);
            });
        } catch (err) {
            console.log(err);
        }
    }

    get client() {
        return this._client;
    }

    get token() {
        return this._token;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bot;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("discord.js");

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commands_index__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_type_check__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_type_check___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_type_check__);



const typecheck = __WEBPACK_IMPORTED_MODULE_1_type_check___default.a.typeCheck;

const deepDiff = (a, b) => JSON.stringify(a) === JSON.stringify(b);
/* unused harmony export deepDiff */


const mapper = (mappingKeys, values) => {
    const obj = {};
    for (const val of mappingKeys) {
        for (let o = 0; o < values.length; o++) {
            obj[val] = values[o];
        }
    }
    return obj;
};
/* unused harmony export mapper */


const parseAndExecuteCommand = async (command, args) => {
    let obj = {};
    for (let i = 0; i < command.args.length; i++) {
        const argument = command.args[i];

        // If is 'advanced' command, like !poll create <params>
        if (typecheck('Object', argument)) {
            // if the command is equal to the current args, shift the array so we only have the args and map that.
            // could use recursion but adds too much complexity, but would allow for !poll create my thing <params>
            if (args[0] === argument.arg) {
                const argsCopy = args.slice();
                argsCopy.shift();
                obj = mapper(argument.params, argsCopy);
            }
            break;
        }

        // If is simple command, use index of current argument for multiple args
        if (typecheck('String', argument)) {
            obj[argument] = args[i];
        }
    }
    await command.execute(obj);
};
/* unused harmony export parseAndExecuteCommand */


const commandParser = async cmd => {
    if (cmd.split('')[0] === process.env.DISCORD_BOT_PREFIX) {
        for (const command of __WEBPACK_IMPORTED_MODULE_0__commands_index__["a" /* default */]) {
            const wholeCommandWithoutPrefix = cmd.substr(1).split(' ');
            if (command.cmd === wholeCommandWithoutPrefix[0]) {
                const onlyArguments = wholeCommandWithoutPrefix.slice();
                onlyArguments.shift();
                await parseAndExecuteCommand(command, onlyArguments);
            }
        }
    }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = commandParser;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__poll__ = __webpack_require__(7);


/* harmony default export */ __webpack_exports__["a"] = ([{
    cmd: 'poll',
    args: [{ arg: 'create', params: ['name'] }, 'dd'],
    execute: __WEBPACK_IMPORTED_MODULE_0__poll__["a" /* default */]
}]);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (async args => {
    console.log('bla', args);
});

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("type-check");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ })
/******/ ]);
//# sourceMappingURL=main.map