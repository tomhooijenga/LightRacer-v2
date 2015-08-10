var ui = {
    canvas: null,
    lobby: null,
    listEl: null,
    listTemplate: "<li>{{players}} <button value=\"{{lobbyId}}\">Join</button></li>",
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
    }
};