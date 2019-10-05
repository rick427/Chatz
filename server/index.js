const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const {addUsers, removeUsers, getUsers, getUsersByRoom} = require('./utils/Users');

const port = process.env.PORT || 5000;

//@: ROUTES
const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', socket => {
  console.log('we have a new connection !!!');

  socket.on('join', ({name, room}, callback) => {
    const {error, user} = addUsers({id: socket.id, name, room});

    if(error) return callback(error);

    socket.emit('message',)
    socket.join(user.room)
  })

  socket.on('disconnect', () => {
      console.log('user has just left !!');
  })
})

app.use(router);

server.listen(port, () => console.log(`Server has started on port ${port}`));