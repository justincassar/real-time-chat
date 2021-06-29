const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

const socket = io();

let userName = "";

const newUserConn = (user) => {
    userName = user;
    socket.emit("new user", userName);
    addToUsers(userName);
};

// Join chatroom
socket.emit('joinRoom', { username, room });

socket.on('message', message => {
    console.log(message);
    outputMessage(message);
});

chatForm.addEventListener('submit', (e) => {

    // Forms usually submit to a file so it can be stopped by using preventDefault();
    e.preventDefault();

    const msg = e.target.elements.msg.value;

    // Send user message to all chat clients
    socket.emit('chatMsg', msg);
});

function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p>${message}</p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

function addToUsers(userName){
    if (!!document.querySelector(`.${userName}-userlist`)) {
        return;
    }

    const userBox = `
        <div class="chat_ib ${userName}-userlist">
          <h5>${userName}</h5>
        </div>
      `;
    inboxPeople.innerHTML += userBox;
}