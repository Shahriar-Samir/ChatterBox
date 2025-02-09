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

export const getReceiverSocketId = (receiverIds: string | string[]) => {
  if (Array.isArray(receiverIds)) {
    // If it's an array of receiver IDs, return a list of their socket IDs
    return receiverIds
      .map((receiverId) => userSocketMap[receiverId])
      .filter(Boolean);
  }
  // If it's a single receiver ID, return the socket ID for that user
  return userSocketMap[receiverIds];
};

const userSocketMap: any = {};
io.on('connection', (socket) => {
  console.log('A User connected', socket.id);
  const uid = socket.handshake.query.uid;

  if (uid !== 'undefined') {
    userSocketMap[uid] = socket.id;
  }

  io.emit('getActiveUsers', Object.keys(userSocketMap));

  socket.on('disconnect', () => {
    console.log('A User disconnected', socket.id);
    delete userSocketMap[uid];
    io.emit('getActiveUsers', Object.keys(userSocketMap));
  });
});

// Send message to one or multiple users
export const sendMessage = (
  senderId: string,
  receiverIds: string | string[],
  message: any,
) => {
  const socketIds = getReceiverSocketId(receiverIds); // Get socket IDs for single or multiple receivers
  if (Array.isArray(socketIds)) {
    // If multiple receivers, send to each socket ID
    socketIds.forEach((socketId) => {
      io.to(socketId).emit('message', { senderId, message });
    });
  } else if (socketIds) {
    // If single receiver, send to that socket ID
    io.to(socketIds).emit('message', { senderId, message });
  }
};

export { io, server };
