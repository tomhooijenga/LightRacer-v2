document.addEventListener('DOMContentLoaded', setup);

function setup() {
    canvas = document.getElementById('game');

    canvas.width = settings.gameSize.x;
    canvas.height = settings.gameSize.y;

    ctx = canvas.getContext('2d');

    ctx.lineWidth = settings.stroke;

    // Setup events
    setupEvents();

    // TODO: must be determined in the lobby page and passed on to game page
    room = "12345";

    // Setup socket
    setupSocket();

    socket.on(action.spawn, function(data) {
        // Init game
        // Game can not start until WebSocket is connected
        game = new Game();

        // TODO: Fetch players
        // Init player
        me = new Player(data.id, 'red', data.dir);
        me.position = [data.x, data.y];

        // Start animating
        game.start(function (progress) {
            drawLine(me, progress * settings.speed);

            // TODO: Draw other players
        });
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

function setupSocket() {
    socket = io(settings.server);
}

/**
 *
 * @param event
 */
function navigate(event) {
    if (event.direction !== Hammer.DIRECTION_NONE && event.direction !== me.direction) {
        if (me.setDirection(event.direction)) {
            socket.emit(action.move, {
                player: me.id,
                room: room,
                pos: me.position
            });
        }
    }
}

/**
 *
 * @param {Player} player
 * @param {number} distance
 */
function drawLine(player, distance) {

    var pos = player.position;

    ctx.strokeStyle = player.color;
    ctx.beginPath();

    switch (player.getDirection()) {
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

    player.position = pos;
}

function rand() {
    // floor(rand * (max - min + 1)) + min
    // floor(rand * (1000 - 0 + 1)) + 0
    return Math.floor(Math.random() * 1001);
}


