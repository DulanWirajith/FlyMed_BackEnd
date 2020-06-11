const express = require('express');
const Response = require('./config/Response');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const socket_io = require('socket.io');
const io = socket_io();
const socket_connection = require('./auth/socketprotection');
var ReplSet = require('mongodb-topology-manager').ReplSet;
 
// Create new instance
var server = new ReplSet('mongod', [{
  // mongod process options
  options: {
    bind_ip: 'localhost', port: 31000, dbpath: './db-1'
  }
}, {
  // mongod process options
  options: {
    bind_ip: 'localhost', port: 31001, dbpath: './db-2'
  }
}, {
  // Type of node
  arbiterOnly: true,
  // mongod process options
  options: {
    bind_ip: 'localhost', port: 31002, dbpath: './db-3'
  }
}], {
  replSet: 'rs'
});
 
const init = async () => {
  // Perform discovery
  var result = await server.discover();
  // Purge the directory
  await server.purge();
  // Start process
  await server.start();
  // Stop the process
  await server.stop();
}
 
// start the replica set
init();
// io.use((socket, next) => {
//     console.log(socket.handshake.query);
//     if (socket.handshake.query && socket.handshake.query.token) {
//         let token = socket.handshake.query.token;
//         if (socket_connection.isValid(token)) {
//             console.log('auth pass')
//             next();
//         }
//         console.log('auth failed 2')
//         next(new Error('authentication error'));
//     } else {
//         console.log('auth failed 1');
//         next(new Error('authentication error'));
//     }
// });

app.io = io;

const customerRoutes = require('./api/routes/customer');
const supplierRoutes = require('./api/routes/supplier');

const Chat = require('./api/service/ChatService')(io);
Chat.createConnection();
const Notification = require('./api/service/NotificationService')(io);
Notification.createConnection();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/BuDDyDB?replicaSet=rs0', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log('\x1b[31m', 'BuDDy Db connection failed try to reconnect...');
        createDbConnection();
    } else {
        console.log('\x1b[33m', 'BuDDy Db Connection up');
    }
});
mongoose.set('useCreateIndex', true);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,Content-Type,Accept,Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

app.use('/api/customer', customerRoutes);
app.use('/api/supplier', supplierRoutes);

app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
})



app.use((req, res, next) => {
    Response.create(res, 200, 'working', null);
});

// io.origins((origin, callback) => {
//     if (origin !== 'https://3d0b8f3d.ngrok.io') {
//         return callback('origin not allowed', false);
//     }
//     callback(null, true);
// });

module.exports = app;
