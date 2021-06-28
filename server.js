const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app)
const io = require('socket.io')(server);
const PORT = 8080;

app.use(express.static(path.join(__dirname, 'public')));

// Server started on port
server.listen(PORT, () => console.log('App listening on port', server.address().port));

io.on('connection', socket => {
    console.log('Client connected');

    // Send message to user
    socket.emit('message', 'Connection to chat client established')

    // Broadcast message to all connections except the user
    socket.broadcast.emit('message', 'New user connected to the chat');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    // Send user chat to all connected clients
    socket.on('chatMsg', (msg) => {
        io.emit('message', msg);
    })
});