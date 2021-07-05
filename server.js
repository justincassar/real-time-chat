const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server);

// Set port
const PORT = 8080;

// Create array for connections
const users = [];

// Set static files
app.use(express.static(path.join(__dirname, 'public')));

// Server started on port
server.listen(PORT, () => console.log('Listening on port', server.address().port));

io.on('connection', socket => {

    console.log(`${socket.id} connected`);

    // Broadcast message to all connections except the user
    socket.on('user-join', (name) => {
        users.push({ id: socket.id, name })
        console.log(name);
        socket.broadcast.emit(`${name} connected`)
    });

    // socket.on('typing', (data) => {
    //     socket.broadcast.emit('typing', { username: socket.username });
    // });

    // Send user chat to all connected clients
    socket.on('chat-msg', (data) => {
        console.log(data);
        io.emit('message', data)
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
        delete users[socket.userId];
    });
});