const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server);

// Set port
const PORT = 8080;

// Create array for connections
const connections = [];

// Set static files
app.use(express.static(path.join(__dirname, 'public')));

// Server started on port
server.listen(PORT, () => console.log('App listening on port', server.address().port));

io.on('connection', socket => {
    console.log('Client connected');

    socket.on("new user", (data) => {
        socket.userId = data;
        connections.add(data);
        io.emit("new user", [...connections]);
    })

    // Send message to user
    socket.emit('message', 'Connection to chat client established')

    // Broadcast message to all connections except the user
    socket.broadcast.emit('message', 'New user connected to the chat');



    // Send user chat to all connected clients
    socket.on('chatMsg', (msg) => {
        io.emit('message', msg);
    })

    socket.on('disconnect', () => {
        connections.delete(socket.userId);
        console.log('Client disconnected');
    });
});