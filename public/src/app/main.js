var game = require('./game/game');
var room = require('./room/room');
var socket = io.connect();
var webrtc = null;

$(function () {
    $('#page-game').hide();
    $('#page-intro').show();
    async.parallel([
        async.apply(initWebRTC),
        async.apply(function (callback) {
            room.init(socket, callback);
        })
    ], launchGame);
});

function initWebRTC(callback) {
    console.log('prepare');
    webrtc = new SimpleWebRTC({
        localVideoEl: 'localVideo',
        remoteVideosEl: 'remotesVideos',
        autoRequestMedia: true
    });

    webrtc.on('readyToCall', function() {
        callback();
    });
}

function launchGame() {
    console.log('launch--');
    webrtc.startLocalVideo();
    webrtc.joinRoom(room.myRoom, function(err, roomDescription) {
        var size = Object.keys(roomDescription.clients).length;
        if (size > 1) {
            webrtc.stopLocalVideo();
            webrtc.leaveRoom();
            alert('Room already used !');
        } else {
            $('#page-game').show();
            $('#page-intro').hide();
            game.init(room.playerType, room.myRoom, socket);
        }
    });
}

//game.init(playerType, playerRoom, socket);
/*
var game = require('./game/game');
var socket = io.connect();
var webrtc = null;
var room = '';
var playerRoom = null;
var playerType = null;

function start() {
    async.parallel([
        async.apply(initWebRTC),
        async.apply(initRoom)
    ], launchCall);
}

function initWebRTC(callback) {
    webrtc = new SimpleWebRTC({
        localVideoEl: 'localVideo',
        remoteVideosEl: 'remotesVideos',
        autoRequestMedia: false
    });

    webrtc.on('readyToCall', function() {
        callback();
    });
}

function initRoom(callback) {
    if (room !== '') {
        socket.emit('create or join', room);
        console.log('Attempted to create or  join room', room);
    }
    socket.on('full', function(room) {
        console.log('Room ' + room + ' is full');
    });

    socket.on('joined', function(room, socket, _playerType) {
        playerRoom = room;
        playerType = _playerType;
        callback(room);
    });
}

function launchCall(results) {
    webrtc.startLocalVideo();
    webrtc.joinRoom(results, function(err, roomDescription) {
        console.log('join room');
        var size = Object.keys(roomDescription.clients).length;
        if (size > 1) {
            webrtc.stopLocalVideo();
            webrtc.leaveRoom();
            alert('Room already used !');
        } else {
            $('#page-game').show();
            $('#page-intro').hide();
            console.log(socket);
            game.init(playerType, playerRoom, socket);
        }
    });
}

socket.on('log', function(array) {
    console.log.apply(console, array);
});

socket.on('retrieve rooms', function(rooms) {
    console.log(rooms);
    for (var key in rooms) {
        $('#room-list').append('<li>Room ' + key + ' : ' + rooms[key].length + ' joueur(s)</li><button class="waves-effect waves-light btn join-room" data-room="' + key + '">Join room</button>');
    }
    $(".join-room").click(join);
});

$(function() {
    $('#page-game').hide();
    $('#page-intro').show();
    $('#create-room').click(create);
    // $('form').submit(function(e){
    //     create();
    //     e.preventDefault();
    // })
    socket.emit('get rooms', {});
});

function create() {
    var room_name = $('#room-name').val();
    room = room_name;
    start();
};

function join() {
    console.log('join');
    room = $(this).data('room');
    start();
};

*/
