const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const {addUsers, removeUsers, getUsers, getUsersByRoom} = require('./utils/Users');

const port = process.env.PORT || 5000;

//@: ROUTES
const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', socket => {
  //console.log('we have a new connection !!!');

  socket.on('join', ({name, room}, callback) => {
    const {error, user} = addUsers({id: socket.id, name, room});

    if(error) return callback(error);

    socket.emit('message', {user: 'admin', text: `${user.name}, Welcome to the room`});
    socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined!`})
    socket.join(user.room);

    io.to(user.room).emit('roomData', {room: user.room, users: getUsersByRoom(user.room)})

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUsers(socket.id);

    io.to(user.room).emit('message', {user: user.name, text: message});
    io.to(user.room).emit('roomData', {user: user.room, users: getUsersByRoom(user.room)});

    callback();
  });

  socket.on('disconnect', () => {
    //console.log('user has just left !!');
    const user = removeUsers(socket.id);
    if(user){
        io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left!`})
    }
  })
})

//@: MIDDLEWARES
app.use(router);
app.use(cors());

server.listen(port, () => console.log(`Server has started on port ${port}`));