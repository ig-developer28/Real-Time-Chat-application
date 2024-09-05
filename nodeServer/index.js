const io=require('socket.io')(8000);

const users = {};
console.log('run');
io.on('connection',(socket)=>{//A server which is connected with the various clients.
    socket.on('new-user-joined',(nam)=>{//Managing Each socket connection between clients and server.
        console.log(`User ${nam} joined`);
        users[socket.id]=nam;
        // console.log(users);
        socket.broadcast.emit('user-joined',nam);//Broadcast to each client except the joinee that a new user is joined.emit means the event is emitted.
    });

    socket.on('send',(message)=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]});//If sender sends a message all the other clients should receive it.
        console.log(users);
    });

    socket.on('disconnect',(message)=>{//socket.on to receive the event and socket.emit to emit or generate the event.
        console.log("disconnected.")
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    })
});
