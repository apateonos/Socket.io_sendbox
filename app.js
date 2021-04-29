const app = require('express');
const httpServer = require('http').createServer(app);
const options = {};
const io = require('socket.io')(httpServer, options);

const PORT = 3000;
const server = http.createServer(app).listen(PORT, () => {
  console.log('server running...');
});

const socketCORS = { cors: { origin: '*', credentials: true }};
const io = socketIO(server, socketCORS);

io.on('connection', socket => {
  console.log('connection' + socket.id);
});