const IO = require('socket.io');
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);
const io = IO(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"],
    }
});

const PORT = 3002;

io.on('connection', (socket) => {
    socket.on('user disconnected', (data) => {
        console.log(`User ${data} disconnected.`);
        io.sockets.emit('user disconnected', data);
    });

    socket.on("user connected", (data) => {
        console.log(`User ${data} connected.`);
        io.sockets.emit('user connected', data);
    });
});

app.get('/', (req, res) => {
    res.send('Realtime-server up and running.');
});

server.listen(PORT, () => {
    console.log(`Real-time server running at http://localhost:${PORT}`);
});

module.exports = app;
