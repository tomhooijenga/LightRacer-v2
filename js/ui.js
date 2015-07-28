var ui = {
    listEl: null,
    listTemplate: "<li>{{players}} <button value=\"{{lobbyId}}\">Join</button></li>",
    list: function (lobbies) {
        var html = [];

        for (var lobby in lobbies)
        {
            var template = ui.listTemplate.replace('{{players}}', lobbies[lobby].players);
            template = template.replace('{{lobbyId}}', lobbies[lobby].id);

            html.push(template);
        }

        // Clear list
        var el = ui.listEl.firstChild;
        while (el) {
            ui.listEl.removeChild(el);
            el = ui.listEl.firstChild
        }
        ui.listEl.insertAdjacentHTML('afterbegin', html.join(''));
    }
};