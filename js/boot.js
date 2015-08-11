
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
    ui.lobby = document.getElementById('lobby');
    ui.listEl = document.querySelector('#lobby ul');
    ui.create = document.getElementById('create');
    ui.refresh = document.getElementById('refresh');

    var canvas = ui.canvas = document.getElementById('game');

    canvas.width = settings.gameSize.x;
    canvas.height = settings.gameSize.y;

    ui.setupButtons();

    ui.setupTouch();

    game = new Game(ui.canvas.getContext('2d'));

    connection.list();
});

