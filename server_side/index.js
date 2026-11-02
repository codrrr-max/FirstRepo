const server = require('socket.io')(process.env.PORT || 8000);
const chat_users = {}

server.on('connection', socket=>{
    socket.on('join', name_=>{
        chat_users[socket.id] = name_
        socket.broadcast.emit("user-joined",  name_)
    })
    socket.on("send", data=>{
        socket.broadcast.emit("recieve", data)
    })
    socket.on("disconnect", (reason) => {
        socket.broadcast.emit("user-disconnect", chat_users[socket.id])
      });
    socket.on('connect_error', (error) => {
        console.error(error);
    });
})

