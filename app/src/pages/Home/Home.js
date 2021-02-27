import socketIOClient  from 'socket.io-client';
import { useEffect, useState } from 'react';

import styles from './Home.module.scss';
import QueueButton from '../../components/QueueButton/QueueButton';
import QueueList from '../../components/QueueList/QueueList';
import QueueModal from '../../components/QueueModal/QueueModal';

export default function Home() {
  const socketUrl = 'http://localhost:4000';
  const [socket, setSocket] = useState(null);
  const [name, setName] = useState('');
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    const server = socketIOClient(socketUrl);
    setSocket(server);

    server.on('queueList', data => setQueueList(data));
    
    server.on('queueRemoved', data => updateQueueList(data));

    server.on('waitingQueue', queueList => [showWaitingQueue(), setQueueList(queueList)])
  }, []);

  const updateQueueList = data => {
    setQueue(() => ([...(Array.isArray(data) ? data : [data])]));
  }

  const setQueueList = data => setQueue(oldQueue => ([
    ...oldQueue,
    ...(Array.isArray(data) ? data : [data]),
  ]));

  const showWaitingQueue = () => setShowModal(true);

  const queueHandler = async () => {
    try {
      setQueueList({ name });
      
      await joinQueue();
    } catch (err) {
      console.log('err', err)
    }
  }

  const joinQueue = async () => {
    socket.emit('joinQueue', { name })
  }

  return (
    <div className={styles.homeContainer}>
      <h1>Simple Queue</h1>

      <div className={styles.contentBox}>
        <div className={styles.inputContainer}>
          <label>Nome:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <QueueButton
          text="Entrar na fila"
          disabled={loading}
          loading={loading}
          onClick={queueHandler}
        />
      </div>
      
      { !!queue.length && (
        <div className={styles.contentBox}>
          <QueueList list={queue} />
        </div>
      ) }

      { showModal && ( <QueueModal /> ) }
    </div>
  );
}