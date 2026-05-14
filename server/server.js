const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

require('dotenv').config();

const connectDB = require('./config/db');
// const authRoutes = require('./routes/authRoutes');
// const pollRoutes = require('./routes/pollRoutes');
// const analyticsRoutes = require('./routes/analyticsRoutes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});
app.set('io', io);
connectDB();

app.use(cors());
app.use(express.json());

// app.use('/api/auth', authRoutes);
// app.use('/api/polls', pollRoutes);
// app.use('/api/analytics', analyticsRoutes);

io.on('connection', (socket) => {
  console.log('a user connected: ' + socket.id);    
    socket.on('disconnect', () => {    
        console.log('user disconnected: ' + socket.id);
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});