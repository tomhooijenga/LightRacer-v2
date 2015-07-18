document.addEventListener('DOMContentLoaded', setup);

function setup() {
    canvas = document.getElementById('game');

    canvas.width = settings.gameSize.x;
    canvas.height = settings.gameSize.y;

    ctx = canvas.getContext('2d');

    ctx.lineWidth = settings.stroke;

    // Setup events
    setupEvents();

    // Init player
    // TODO: Use color chosen in lobby
    me = new Player('red', dir.down);

    // TODO: Maybe let server decide?
    me.last = [rand(), rand()];

    // Init game
    game = new Game();

    // Start animating
    game.start(function (progress) {
        drawLine(me, progress * settings.speed);

        // TODO: Draw other players
    });
}

/**
 * Setup Hammer events
 */
function setupEvents() {
    hammer = new Hammer(canvas, {
        recognizers: [
            [Hammer.Pan, {direction: Hammer.DIRECTION_ALL}],
            [Hammer.Swipe, {direction: Hammer.DIRECTION_ALL}]
        ]
    });

    hammer.on("pan swipe", navigate);
}

function navigate(event) {
    if (event.direction !== Hammer.DIRECTION_NONE) {
        me.setDirection(event.direction);
    }

    // TODO: Notify server
}

/**
 *
 * @param {Player} player
 * @param {number} distance
 */
function drawLine(player, distance) {

    var pos = player.last,
        stroke = settings.stroke,
        direction;


    ctx.strokeStyle = player.color;
    ctx.beginPath();

    switch (player.getDirection())
    {
        case dir.up:
            ctx.moveTo(pos[0], pos[1] + 1);
            ctx.lineTo(pos[0], pos[1] - distance - 1);

            pos[1] -= distance;

            break;
        case dir.down:
            ctx.moveTo(pos[0], pos[1] - 1);
            ctx.lineTo(pos[0], pos[1] + distance + 1);

            pos[1] += distance;

            break;
        case dir.left:
            ctx.moveTo(pos[0] + 1, pos[1]);
            ctx.lineTo(pos[0] - distance - 1, pos[1]);

            pos[0] -= distance;

            break;
        case dir.right:
            ctx.moveTo(pos[0] - 1, pos[1]);
            ctx.lineTo(pos[0] + distance + 1, pos[1]);

            pos[0] += distance;

            break;
    }

    ctx.stroke();

    player.last = pos;
}

function rand() {
    // floor(rand * (max - min + 1)) + min
    // floor(rand * (1000 - 0 + 1)) + 0
    return Math.floor(Math.random() * 1001);
}


