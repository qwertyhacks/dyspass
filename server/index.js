const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, '..', 'client')));

io.on('connection', socket => {
  console.log('User connected:', socket.id);

  socket.on('chat message', msg => {
    io.emit('chat message', { user: socket.id, text: msg });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Dyspass server running on port ${PORT}`);
});
