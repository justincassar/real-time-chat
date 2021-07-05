const socket = io();

const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('user-list');
const messageForm = document.getElementById('message-form');
const msgInput = document.getElementById('msg-input');
var userName = document.getElementById('username');

userName = "";

const newUserConn = (user) => {
    userName = user;
    socket.emit('user-join', userName);
    addToUsers(userName);
};

// Message from server
socket.on('message', (message) => {
    console.log(message);
    showMessage(message);
});

messageForm.addEventListener('submit', (e) => {

    // Forms usually submit to a file so it can be stopped by using preventDefault();
    e.preventDefault();

    const msg = msgInput.value;

    // Send user message to all chat clients
    socket.emit('chat-msg', msg);
    msgInput.value = '';
});

function showMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p>${message}</p>`;
    document.querySelector('.chat-messages').appendChild(div);
};

function showUsers(users) {
    userList.innerText = '';
    users.forEach((user) => {
        const li = document.createElement('li');
        li.innerText = user.displayname;
        userList.appendChild(li);
    });
};