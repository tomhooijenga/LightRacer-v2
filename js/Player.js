/**
 *
 * @param color
 * @param dir
 * @constructor
 */
var Player = function (id, color, dir) {
    /**
     * @type {number} The player's id
     */
    this.id = id;
    /**
     * @type {string} Any string that can be parsed as color
     */
    this.color = color;

    /**
     * @type {number} The player's direction
     */
    this.direction = dir;

    /**
     * @type {*[]} position - The player's position
     */
    this.position = [0, 0];
};

/**
 *
 * @returns {number}
 */
Player.prototype.getDirection = function () {
    return this.direction;
};

/**
 *
 * @param {number} direction
 */
Player.prototype.setDirection = function (direction) {

    // TODO: must move a minimum amount before going back in the opposite direction
    // ex: go up, go left for 1px, go down => you're in your own line

    // Can't go backwards
    if (oppositeDir[direction] !== this.direction)
    {
        this.direction = direction;

        return true;
    }
};