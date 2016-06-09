
var socket = io.connect();
var webrtc = null;

async.parallel([
	async.apply(initWebRTC), 
	async.apply(initRoom)
], launchCall);

function initWebRTC (callback) {
	webrtc = new SimpleWebRTC({
	    localVideoEl: 'localVideo',
	    remoteVideosEl: 'remotesVideos',
	    autoRequestMedia: true
	});

	webrtc.on('readyToCall', function () {
	    callback();
	});
}

function initRoom(callback) {
	var room = prompt('Enter room name');

	if (room !== '') {
	  socket.emit('create or join', room);
	  console.log('Attempted to create or  join room', room);
	}

	socket.on('created', function(room) {
	  console.log('Created room ' + room);
	});

	socket.on('full', function(room) {
	  console.log('Room ' + room + ' is full');
	});

	socket.on('joined', function(room) {
	  console.log('joined: ' + room);
	  callback(room);
	});
}

function launchCall(results) {
	console.log('results:', results);
	console.log('webRTC:', webrtc);
	webrtc.joinRoom(results);
}

/* socket */
socket.on('join', function (room){
  console.log('Another peer made a request to join room ' + room);
  console.log('This peer is the initiator of room ' + room + '!');
});

socket.on('log', function(array) {
  console.log.apply(console, array);
});