import styles from './Dashboard.module.css';
import Stopwatch from './Stopwatch';

const Dashboard = ({ newTask, userName }) => {


    return (
        <div>
            <div>
                <p className={styles.p}>Hello, {userName}!</p>
            </div>

            <div>
                <p className={styles.tag}>Daily Overview </p>
            </div>
            <div className={styles.tasks_count}>
                <div className={styles.clock}>
                    <img src={require('../assets/clock-icon.png')} alt="clock icon" />
                    <span><p>6:00</p></span>
                </div>
                <div className={styles.tasks}>
                    <span><p>4</p></span>
                    <img src={require('../assets/task-icon.png')} alt="task icon" />
                </div>
            </div>
            <div className={styles.graphic_container}>
                <div className={styles.graphic}></div>
            </div>
            <div className={styles.newTask}>
                <button onClick={newTask} >New Task</button>
            </div>
        </div>
    )
}

export default Dashboard