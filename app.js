const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);

app.use('/static', express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/view/index.html');
})

const PORT = 4000;
httpServer.listen(PORT, () => {
  console.log(`${PORT} server running...`);
});

const io = require('socket.io')(httpServer);

io.on('connection', socket => {
  console.log('connection' + socket.id);

  socket.on('join room', (room) => {
    socket.join(room);
  });

  socket.on('leave room', (room) => {
    socket.leave(room);
  })

  socket.on('message', (item) => {
    io.to(item.room).emit('receive', item);
  })

  socket.on('disconnect', () => {
    console.log(socket.id, 'user disconnect');
  })
});