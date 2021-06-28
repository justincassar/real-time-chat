const socket = io();

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