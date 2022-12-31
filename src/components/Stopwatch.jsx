import styles from './Stopwatch.module.css';

const Stopwatch = (props) => {
    return (
        <>
            <div className={styles.stopwatch}>
                <div className={styles.cronometer}>
                    <span>00:00:00</span>
                </div>
            </div>
            <div className={styles.icons}>
                <i className="bi bi-play-fill"></i>
                <i className="bi bi-pause-fill"></i>
            </div>
            <div>
                <button onClick={props.finishTask}>Finish</button>
            </div>

        </>
    )
}

export default Stopwatch