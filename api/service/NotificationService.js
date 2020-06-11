const Socket = require('./../../server');
const io = require('socket.io');


function notificationConnection(io) {
    if (!(this instanceof notificationConnection)) {
        return new notificationConnection(io);
    }
    this.io = io;
    this.io.path('/notification');
};

notificationConnection.prototype.createConnection = function () {

    this.io.on('connection', function (socket) {
        console.log("connect");
       
        socket.on('incomming', (data) => {
           
        });

    });
};

module.exports = notificationConnection;