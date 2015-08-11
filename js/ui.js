var ui = {
    canvas: null,
    create: null,
    refresh: null,
    lobby: null,
    listEl: null,
    listTemplate: "<li>{{players}} / 4 <button value=\"{{lobbyId}}\">Join</button></li>",
    list: function (lobbies) {
        var html = [];

        lobbies.forEach(function (lobby)
        {
            if (lobby === null) return;

            var template = ui.listTemplate.replace('{{players}}', lobby.players.length);
            template = template.replace('{{lobbyId}}', lobby.id);

            html.push(template);
        });

        // Clear list
        var el = ui.listEl.firstChild;
        while (el) {
            ui.listEl.removeChild(el);
            el = ui.listEl.firstChild
        }
        ui.listEl.insertAdjacentHTML('afterbegin', html.join(''));
    },
    join: function () {
        ui.toggle(ui.lobby);
        ui.toggle(ui.canvas);

        connection.spawn();
    },
    toggle: function (el) {
        el.classList.toggle('hide');
    },
    setupButtons: function () {
        ui.listEl.addEventListener('click', function (e) {
            if (e.target.nodeName === 'BUTTON')
            {
                connection.join(e.target.value);
            }
        });

        ui.create.addEventListener('click', function () {
            connection.create();
        });

        ui.refresh.addEventListener('click', function () {
            connection.list();
        });
    },
    setupTouch: function () {
        var hammer = new Hammer(ui.canvas, {
            recognizers: [
                [Hammer.Pan, {direction: Hammer.DIRECTION_ALL}],
                [Hammer.Swipe, {direction: Hammer.DIRECTION_ALL}]
            ]
        });

        hammer.on("pan swipe", function () {
            if (me.setDirection(event.direction)) {
                socket.emit(action.move, {
                    pos: players[player].position
                });
            }
        });
    }
};