var connection = {
    /**
     * The socket
     */
    socket: null,
    /**
     * List of games that can be joined
     */
    list: function (lobbies) {
        if (!lobbies)
        {
            this.socket.emit('list');
        }

        ui.list(lobbies);
    },
    /**
     * Create a new game
     */
    create: function () {

    },
    /**
     * Leave a game
     */
    leave: function () {

    },
    /**
     * Join someone else's game
     */
    join: function () {

    },
    /**
     * Change direction of player
     */
    move: function () {

    },
    /**
     * Spawn the player
     */
    spawn: function () {

    }
};
