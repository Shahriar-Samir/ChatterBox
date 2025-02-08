import { Server } from 'socket.io';
import http from 'http';
import { app } from '../app'; // Importing app after it's properly set up
const server = http.createServer(app);
// Initialize Socket.IO with CORS settings
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

export const getReceiverSocketId = (receiverId: string) => {
  return userSocketMap[receiverId];
};

const userSocketMap: any = {};
io.on('connection', (socket) => {
  console.log('A User connected', socket.id);
  const uid = socket.handshake.query.uid;
  if (uid != 'undefined') {
    userSocketMap[uid] = socket.id;
  }
  io.emit('getActiveUsers', Object.keys(userSocketMap));
  socket.on('disconnect', () => {
    console.log('A User disconnected', socket.id);
    delete userSocketMap[uid];
    io.emit('getActiveUsers', Object.keys(userSocketMap));
  });
});
export { io, server };
