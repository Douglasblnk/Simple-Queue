import styles from './QueueButton.module.scss';

export default function QueueButton(props) {
  return (
    <div className={styles.queueButtonContainer}>
      <button {...props}>
        <p>
          {props.text}
        </p>
      </button>

      { props.loading ? ( <p>Carregando...</p> ) : null }
    </div>
  );
}