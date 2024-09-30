/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/SASS/main.scss":
/*!****************************!*\
  !*** ./src/SASS/main.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://portfolio/./src/SASS/main.scss?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _SASS_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SASS/main.scss */ \"./src/SASS/main.scss\");\n\r\n\r\n// Checker for if an element is in the viewport.\r\nconst isInViewPort = (element, percentage = 0) => {\r\n    const rect = element.getBoundingClientRect();\r\n    const windowHeight = window.innerHeight || document.documentElement.clientHeight;\r\n\r\n    const elementTopInView = rect.top <= windowHeight && rect.top >= 0;\r\n    const elementBottomInView = rect.bottom >= 0 && rect.bottom <= windowHeight;\r\n\r\n    const elementHeight = rect.bottom - rect.top;\r\n    const visiblePercentage = (elementHeight - Math.max(0, -rect.top, rect.bottom - windowHeight)) / elementHeight * 100;\r\n\r\n    return elementTopInView || elementBottomInView || visiblePercentage >= percentage;\r\n}\r\n\r\n// Checks and see if an element is in the view port and if it is then adds an enter animation.\r\nconst handleScroll = () => {\r\n    const aboutMe = document.getElementById(\"about-me\");\r\n    const skills = document.getElementById(\"skills\");\r\n    const projects = document.getElementById(\"project-container\");\r\n    const contact  = document.getElementById(\"contact\");\r\n    \r\n    if (isInViewPort(aboutMe, 50)) {\r\n        aboutMe.classList.add(\"active\");\r\n        skills.classList.add(\"active\");\r\n\r\n\r\n        projects.classList.remove(\"active\");\r\n        contact.classList.remove(\"active\");\r\n    }\r\n    else if (isInViewPort(contact)) {\r\n        contact.classList.add(\"active\");\r\n\r\n        aboutMe.classList.remove(\"active\");\r\n        skills.classList.remove(\"active\");\r\n        projects.classList.remove(\"active\");\r\n    }\r\n    else {\r\n        aboutMe.classList.remove(\"active\");\r\n        skills.classList.remove(\"active\");\r\n        projects.classList.remove(\"active\");\r\n        contact.classList.remove(\"active\");\r\n    }\r\n}\r\n\r\nwindow.addEventListener(\"scroll\", handleScroll);\r\n\r\n// Initial trigger in case they start the webpage with an element already in the viewport.\r\nhandleScroll();\r\n\r\n\r\n\r\n// ********************** Canvas Styles ********************** //\r\n\r\nconst canvas = document.getElementById('skyCanvas');\r\nconst ctx = canvas.getContext('2d');\r\ncanvas.width = window.innerWidth;\r\ncanvas.height = window.innerHeight;\r\n\r\nlet starsArray = [];\r\nconst numberOfStars = 200;\r\nlet mouse = { x: undefined, y: undefined };\r\n\r\n// Capture mouse position\r\nwindow.addEventListener('mousemove', (event) => {\r\n    const rect = canvas.getBoundingClientRect();\r\n    mouse.x = event.clientX - rect.left;\r\n    mouse.y = event.clientY - rect.top;\r\n});\r\n\r\nwindow.addEventListener('mouseleave', () => {\r\n    mouse.x = undefined;\r\n    mouse.y = undefined;\r\n});\r\n\r\n// Star class to handle each individual star particle\r\nclass Star {\r\n    constructor(x, y) {\r\n        this.x = x;\r\n        this.y = y;\r\n        this.size = Math.random() * 3 + 1; // Small stars\r\n        this.originalSize = this.size; // Store original size for restoring later\r\n        this.speedX = (Math.random() - 0.5) * 0.2; // Slow horizontal movement\r\n        this.speedY = (Math.random() - 0.5) * 0.2; // Slow vertical movement\r\n        this.opacity = Math.random(); // Random opacity for twinkling effect\r\n        this.moveAwayFactor = 100; // Factor to determine how much to move away from mouse\r\n    }\r\n\r\n    update() {\r\n        // Move the star slowly\r\n        this.x += this.speedX;\r\n        this.y += this.speedY;\r\n\r\n        // Check if mouse is close and move star away\r\n        if (mouse.x && mouse.y) {\r\n            const dx = mouse.x - this.x;\r\n            const dy = mouse.y - this.y;\r\n            const distance = Math.sqrt(dx * dx + dy * dy);\r\n\r\n            if (distance < this.moveAwayFactor) {\r\n                // Move star away from mouse\r\n                const forceDirectionX = dx / distance;\r\n                const forceDirectionY = dy / distance;\r\n                const maxDistance = this.moveAwayFactor;\r\n                const force = (maxDistance - distance) / maxDistance;\r\n\r\n                const directionX = forceDirectionX * force * 3;\r\n                const directionY = forceDirectionY * force * 3;\r\n\r\n                this.x -= directionX;\r\n                this.y -= directionY;\r\n            }\r\n        }\r\n\r\n        // Restore original size gradually after interaction\r\n        this.size = Math.min(this.size + 0.05, this.originalSize);\r\n    }\r\n\r\n    draw() {\r\n        ctx.save(); // Save current drawing state\r\n        ctx.globalAlpha = this.opacity; // Set star opacity\r\n        ctx.fillStyle = \"white\"; // Star color\r\n        ctx.beginPath();\r\n        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);\r\n        ctx.fill();\r\n        ctx.restore(); // Restore original state\r\n    }\r\n}\r\n\r\n// Initialize the stars\r\nfunction init() {\r\n    starsArray = [];\r\n    for (let i = 0; i < numberOfStars; i++) {\r\n        const x = Math.random() * canvas.width;\r\n        const y = Math.random() * canvas.height;\r\n        starsArray.push(new Star(x, y));\r\n    }\r\n}\r\n\r\n// Handle stars update and drawing\r\nfunction handleStars() {\r\n    for (let i = 0; i < starsArray.length; i++) {\r\n        starsArray[i].update();\r\n        starsArray[i].draw();\r\n\r\n        // Remove stars that go out of bounds\r\n        if (starsArray[i].x > canvas.width + 50 || starsArray[i].x < -50 || \r\n            starsArray[i].y > canvas.height + 50 || starsArray[i].y < -50) {\r\n            starsArray.splice(i, 1);\r\n            i--;\r\n        }\r\n    }\r\n}\r\n\r\n// Animation loop\r\nfunction animate() {\r\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\r\n    handleStars();\r\n\r\n    // Generate new stars periodically to fill the screen\r\n    if (starsArray.length < numberOfStars) {\r\n        const x = Math.random() * canvas.width;\r\n        const y = Math.random() * canvas.height;\r\n        starsArray.push(new Star(x, y));\r\n    }\r\n\r\n    requestAnimationFrame(animate);\r\n}\r\n\r\n// Adjust canvas size on window resize\r\nwindow.addEventListener('resize', () => {\r\n    canvas.width = window.innerWidth;\r\n    canvas.height = window.innerHeight;\r\n    init();\r\n});\r\n\r\n// Initiate Animation\r\ninit();\r\nanimate();\n\n//# sourceURL=webpack://portfolio/./src/index.js?");

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
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
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