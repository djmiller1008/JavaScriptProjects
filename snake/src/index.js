const View = require("./snake-view");

$(() => {
    const rootEl$ = $('.snake');
    new View(rootEl$);
})