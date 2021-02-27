const { queue } = require('./queue');
const queueList = require('./queueList.json');

const io = require('socket.io')(4000, {
  cors: {
    origin: 'http://localhost:3000',
  }
});

io.on('connection', socket => {
  console.log('connected');

  socket.emit('queueList', queueList);

  socket.on('joinQueue', async data => {
    if (queueList.length) socket.emit('waitingQueue', queueList);
    await queue(data, io);

    
  });

  socket.on('disconnect', () => {
    console.info('Disconnected');
  });
});
