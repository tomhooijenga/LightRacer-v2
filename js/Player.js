/**
 *
 * @param color
 * @param dir
 * @constructor
 */
var Player = function (color, dir) {
    /**
     * @type {string} Any string that can be parsed as color
     */
    this.color = color;

    /**
     * @type {number} The player's direction
     */
    this.direction = dir;

    /**
     * @type {*[]} last - The player's last position
     */
    this.last = [0, 0];
};