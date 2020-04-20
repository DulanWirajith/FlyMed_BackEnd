const Socket = require('./../../server');
const io = require('socket.io');
const Conversation = require('./../controllers/conversation_controller');

function chatConnection(io) {
    if (!(this instanceof chatConnection)) {
        return new chatConnection(io);
    }
    this.io = io;
    this.io.path('/chat');
};

chatConnection.prototype.createConnection = function () {

    this.io.on('connection', function (socket) {
        console.log("connect");
        socket.on('typing', (data) => {
            socket.emit('typing-'+data.to, { message: '...' });
        });

        socket.on('send', (data) => {
            Conversation.save(data).then(result => {
                socket.emit('receive-'+data.to, { message: 'reload' });
            }).catch(err => {
                socket.emit('receive-'+data.to, { message: 'error' });
            })
        });

    });
};

module.exports = chatConnection;