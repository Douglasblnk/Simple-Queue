const queueList = require('./queueList.json');

function addUserToQueue(queueData) {
  queueList.push(queueData);
}

async function executeQueue(io) {
  if (queueList.length === 0) {
    console.log('ALL DONE');
    return;
  }

  await timeout(6000);
  queueList.splice(0, 1);

  io.emit('queueRemoved', queueList);
  
  console.log('removed queue =>', queueList);

  return executeQueue(io);
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports.queue = async (queueData, io) => {
  try {
    addUserToQueue(queueData);
    
    if (queueList.length) await executeQueue(io);
  } catch (err) {
    console.log('err', err);
  }
}
