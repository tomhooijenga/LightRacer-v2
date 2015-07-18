var dir,
    oppositeDir,
    action,
    settings,
    canvas,
    ctx,
    game,
    me,
    players = {},
    hammer,
    socket,
    room;

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

/**
 * @enum {number}
 * @readonly
 */
oppositeDir = {};
oppositeDir[dir.up] = dir.down;
oppositeDir[dir.down] = dir.up;
oppositeDir[dir.left] = dir.right;
oppositeDir[dir.right] = dir.left;

/**
 * @enum {string}
 * @readonly
 */
action = {
    /**
     * List of games that can be joined
     */
    list: 'list',
    /**
     * Create a new game
     */
    create: 'create',
    /**
     * Leave a game
     */
    leave: 'leave',
    /**
     * Join someone else's game
     */
    join: 'join',
    /**
     * Change direction of player
     */
    move: 'move'
};

/**
 *
 * @type {{stroke: number, speed: number}}
 */
settings = {
    /**
     * Thickness of player's line
     */
    stroke: 4,

    /**
     * Speed in pixels per second
     */
    speed: 100,

    /**
     * Size of game in pixels
     */
    gameSize: {
        x: 1000,
        y: 1000
    },

    /**
     * The game server
     */
    server: 'ws://localhost:8001'
};