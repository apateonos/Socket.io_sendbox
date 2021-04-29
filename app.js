const app = require('express')();
const httpServer = require('http');
const socketIO = require('socket.io');

const PORT = 3000;
const server = httpServer.createServer(app).listen(PORT, () => {
  console.log(`${PORT} server running...`);
});

app.get('/ping', (req, res) => {res.send('pong!')});
/* 
const socketCORS = { cors: { origin: '*:*' }};
const io = socketIO(server, socketCORS);

io.on('connection', socket => {
  console.log('connection' + socket.id);
}); */