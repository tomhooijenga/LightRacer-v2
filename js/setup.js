var dir, canvas, ctx, width, height, game, me, players = {}, hammer;

/**
 * Thickness of all player lines
 * @type {number}
 */
var stroke = 4;
/**
 * Speed in pixels per second
 * @type {number}
 */
var speed = 100;

/**
 * @enum {number}
 * @readonly
 */
dir = {
    up: Hammer.DIRECTION_UP,
    left: Hammer.DIRECTION_LEFT,
    right: Hammer.DIRECTION_RIGHT,
    down: Hammer.DIRECTION_DOWN
};

document.addEventListener('DOMContentLoaded', setup);

function setup() {
    canvas = document.getElementById('game');
    ctx = canvas.getContext('2d');
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = 1000;
    canvas.height = 1000;

    // Setup events
    setupEvents();


    // Init player
    me = new Player('red', dir.down);
    me.last = [rand(), rand()];

    // Init game
    game = new Game();

    // Start animating
    game.start(function (progress) {
        drawLine(me, progress * speed);

        // TODO: Draw other players
    });
}

/**
 *
 * @param {Player} player
 * @param {number} distance
 */
function drawLine(player, distance) {

    var pos = player.last,
        direction;

    ctx.lineWidth = stroke;
    ctx.strokeStyle = player.color;
    ctx.beginPath();
    ctx.moveTo(pos[0], pos[1]);

    // Up or down is 1, left or right is 0
    direction = player.direction === dir.up || player.direction === dir.down ? 1 : 0;

    // left and up are negative distance
    distance = player.direction === dir.up || player.direction === dir.left ? -distance : distance;

    pos[direction] += distance;

    ctx.lineTo(pos[0], pos[1]);

    ctx.stroke();

    player.last = pos;
}

function rand() {
    // floor(rand * (max - min + 1)) + min
    // floor(rand * (1000 - 0 + 1)) + 0
    return Math.floor(Math.random() * 1001);
}

function setupEvents() {
    hammer = new Hammer(canvas, {
        recognizers: [
            [Hammer.Pan, {direction: Hammer.DIRECTION_ALL}],
            [Hammer.Swipe, {direction: Hammer.DIRECTION_ALL}]
        ]
    });

    hammer.on("pan swipe", function (ev) {

        // TODO: Prevent move to opposite direction
        me.direction = ev.direction;

        // TODO: Notify server
    });
}
