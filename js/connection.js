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
        else
        {
            ui.list(lobbies);
        }
    },
    /**
     * Create a new game
     */
    create: function (created) {
        if (!created)
        {
            this.socket.emit('create');
        }
        else
        {
            ui.join();
        }
    },
    /**
     * Leave a game
     */
    leave: function () {

    },
    /**
     * Join someone else's game
     */
    join: function (lobbyId) {
        console.log(arguments);
        if (lobbyId === true)
        {
            ui.join();
        }
        else
        {
            this.socket.emit('join', lobbyId);
        }
    },
    ready: function (spawn, playerId)
    {
        if (playerId)
        {
            player = playerId;
        }

        this.socket.emit('ready');
    },
    /**
     * Move the player to a new point
     */
    move: function (data) {
        console.log(data);
    },
    turn: function (data, send)
    {
        if (send)
        {
            this.socket.emit('turn', data);
        }
        else
        {
            players[data.playerId].setDirection(data.direction);
        }
    },
    /**
     * Spawn the player
     */
    spawn: function (data) {
        if (data)
        {
            // TODO: Let players choose color
            if (!players[data.playerId])
            {
                players[data.playerId] = new Player(data.playerId, data.color, data.dir);

                players[data.playerId].position = [data.x, data.y];

                game.spawn(players[data.playerId]);
            }
        }
        else
        {
            this.socket.emit('spawn')
        }
    }
};
