# express-socket.io
---
## Execution
```
node app
```

## Install
```
npm i --save express socket.io
```

## Connection

### Server
```javascript
const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);

...

const PORT = 4000;
httpServer.listen(PORT, () => {
  console.log(`${PORT} server running...`);
});

const io = require('socket.io')(httpServer);

io.on('connection', socket => {
  console.log(socket);
}
```

## Client
```html
<script src="/socket.io/socket.io.js"></script>
<script>
  const socket = io('http://localhost:4000');
  
  socket.on('connect', () => { console.log('connect')});
</script>
```

## Emit & On
### socket.emit(event, data);
`emit`은 클라이언트와 서버가 서로에게 data를 보내는 수단이다. 보내는곳은 event에 해당하는곳에 보내진다. 
보내는 data는 문자열, 숫자부터 오브젝트, 배열, 함수 어떤것도 가능하다.

### socket.on(event, (data) => {...});
`on`은 서버나 클라이언트가 `emit`으로 보내준 데이터를 받아서 실행시키는 기능이다.

## Join Room
`socket.join('room string')`으로 서버에서 방에 들어간다.
클라이언트는 직접적으로 접근이 불가능하므로 `socket.emit()`을 통해서 서버에게 요청을 보낸다.

클라이언트는 Connect와 동시에 자기 socket.id와 동일한 room을 얻는다.

### Server
```javascript
const io = require('socket.io')(httpServer);

io.on('connection', socket => {
  console.log('connection' + socket.id);

  socket.on('join room', (room) => {
    socket.join(room);
  });
  ...
});
```

### Client
```javascript
function joinRoom() {
  const room = ''; //string;
  socket.emit('join room', room);
}
```

## Send
클라이언트는 `emit`명령으로 서버에게 data를 보내주고, 서버는 제공받은 데이터를 토대로 원하는 방`io.to().emit(data)`에 data를 보내준다.

### server
```javascript
socket.on('message', (item) => {
  io.to(item.room).emit('receive', item);
})
```

### client send
```javascript
socket.emit('message', item);
```

### client receive
클라이언트가 서버에게 특정 방에 데이터를 보내게 할수있고, 보내어진 데이터는 해당 방에 있는 모든 유저에게 `socket.on()`을 통해서 받게할수있다.
```javascript
socket.on('receive', (item) => { ... };
```

### 
커넥션과 동시에 클라이언트는 socket.id와 동일한 room을 제공받는다. 즉 해당 룸에 `to().emit()`을 하면 해당유저에게만 보이는 메세지, 귓속말을 할수있게된다.

### Leave room
```javascript
socket.on('leave room', (room) => {
  socket.leave(room);
})
```

