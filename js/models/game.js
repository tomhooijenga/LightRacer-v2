/**
 *
 * @constructor
 */
var Game = function (ctx) {

    /**
     *
     */
    this.ctx = ctx;

    /**
     * The current frame
     * @type {null|number}
     */
    this.frame = null;
};

/**
 * Start the animation
 * @param callback
 */
Game.prototype.start = function (callback) {
    var start = window.performance.now(),
        self = this;

    function loop(time) {
        self.frame = window.requestAnimationFrame(loop);

        // elapsed is in seconds
        // Hopefully 0.016 which means 60fps
        var elapsed = (time - start) / 1000;

        callback(elapsed);

        start = time;
    }

    // Kick off animation
    this.frame = window.requestAnimationFrame(loop);
};

/**
 * Stop the animation
 */
Game.prototype.stop = function () {
    window.cancelAnimationFrame(this.frame);
};

Game.prototype.spawn = function (player) {
    this.ctx.fillStyle = player.color;

    this.ctx.fillRect(player.position[0], player.position[1], settings.stroke, settings.stroke);
};