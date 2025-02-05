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

const userSocketMap: Record<string, string[]> = {};

export const getSocketIds = (CId: string): string[] => {
  return userSocketMap[CId] || [];
};

io.on('connection', (socket) => {
  console.log('A User connected', socket.id);

  const { uid, CId } = socket.handshake.query;

  if (uid && uid !== 'undefined' && CId) {
    if (!userSocketMap[CId]) {
      userSocketMap[CId] = [];
    }
    userSocketMap[CId].push(socket.id);
    socket.join(CId);
  }

  io.emit('getActiveUsers', Object.keys(userSocketMap));

  socket.on('disconnect', () => {
    console.log('A User disconnected', socket.id);
    if (CId && userSocketMap[CId]) {
      userSocketMap[CId] = userSocketMap[CId].filter((id) => id !== socket.id);
      if (userSocketMap[CId].length === 0) {
        delete userSocketMap[CId];
      }
    }
    io.emit('getActiveUsers', Object.keys(userSocketMap));
  });
});

export { io, server };
