const express = require('express')
const socket = require('socket.io')

const app = express()
let connections = []

app.use(express.static('public'))

const server = app.listen(8080, () => {
    console.log("Server listening at port 8080");
})

const io = socket(server)

io.on('connection', (socket) => {
    connections.push(socket)
    console.log(`${connections.length} socket connection established`)

    socket.on('newMessage', (data) => {
        io.sockets.emit('newMessage', {...data, time: new Date().toLocaleString()})
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data)
    })

    socket.on('notTyping', (data) => {
        socket.broadcast.emit('notTyping')
    })
    
    socket.on('disconnect', (socket) => {
        connections.splice(connections.indexOf(socket), 1)
        console.log(`${connections.length} socket connection established`)
    })
})