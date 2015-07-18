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

Player.prototype.getDirection = function () {
    return this.direction;
};

Player.prototype.setDirection = function (direction) {

    // Can't go backwards
    if (oppositeDir[direction] !== this.direction)
    {
        this.direction = direction;
    }
};