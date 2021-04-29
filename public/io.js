const socket = io('http://localhost:4000');
let room = 0;

socket.on('receive', (item) => {
  const monitor = document.getElementById('monitor');
  const card = document.createElement('div');
  const name = document.createElement('span');
  const message = document.createElement('span');
  name.setAttribute('class', 'name');
  card.setAttribute('class', 'card');
  message.setAttribute('class', 'message');
  name.innerHTML = item.user;
  message.innerHTML = item.message;

  card.appendChild(name);
  card.appendChild(message);
  monitor.appendChild(card);
  monitor.scrollTop = monitor.scrollHeight;
})

function join (enter) {
  socket.emit('leave room', room);
  socket.emit('join room', enter);

  room = enter;
}

function send () {
  const user = document.getElementById('user_name').value;
  const message = document.getElementById('message').value;
  
  socket.emit('message', {id:socket.id, room, user, message});
};

function disconnect () {
  socket.emit('leave room', room);
}