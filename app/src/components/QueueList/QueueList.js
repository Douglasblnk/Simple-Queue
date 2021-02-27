import styles from './QueueList.module.scss';

export default function QueueList(props) {
  return (
    <div className={styles.queueListContainer}>
      <div>
        <h3>Aguardando na fila...</h3>
      </div>

      { props.list.map((list, index) => (
        <div className={styles.userList} key={`${list.name}-${index}`}>
          <p>{list.name}</p>
          <p>{list.age}</p>
        </div>
      )) }
    </div>
  );
}