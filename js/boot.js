
// init connection
// setup actions
// (login)
// fetch lobbies
// setup ui
// setup events

// Init connection
connection.socket = new io(settings.server);

// Setup actions
for (var act in action)
{
    if (action.hasOwnProperty(act))
    {
        connection.socket.on(act, connection[act]);
    }
}

window.addEventListener('DOMContentLoaded', function () {
    ui.listEl = document.querySelector('#lobby ul');

    ui.list();
});