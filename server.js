const http = require('http');
const app=require('./app');

const port = process.env.PORT || 2020;

const server = http.createServer(app);
var io=app.io;
io.attach(server);

server.listen(port);
module.exports.io=io;