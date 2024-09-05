var connectionOptions =  {
    "force new connection" : true,
    "reconnectionAttempts": "Infinity", 
    "timeout" : 10000,                  
    "transports" : ["websocket"]
};
var socket = io.connect('http://localhost:8000', connectionOptions);

const form = document.getElementsByName('send-container');
const messageInput=document.getElementById('messageInp');
const messageContainer=document.querySelector('.container');
var audio=new Audio('pop-up.mp3');

function append(message,position){
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    audio.play();
};

const nam=prompt('Enter your name to join: ');
socket.emit('new-user-joined',nam);

socket.on('user-joined',(name)=>{
    console.log("verified");
    append(`${name} joined the chat`,'right');
});

socket.on("receive",(data)=>{
    append(`${data.name} : ${data.message}`,'left');
});

form.addEventListener('submit',(e)=>{
    console.log(e);
    e.preventDefault();
    const message=messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value='';
});

socket.on('left',(name)=>{
    append(`${name} left the chat.`,'left');
})