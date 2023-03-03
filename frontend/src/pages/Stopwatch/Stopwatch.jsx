import styles from './Stopwatch.module.css';

import { useEffect, useState } from 'react';

import tasksService from '../../services/tasksService'

const Stopwatch = (props) => {

    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [time, setTime] = useState(0);
    const [taskName, setTaskName] = useState("")

    useEffect(() => {
        let interval = null;

        if (isActive && !isPaused) {
            interval = setInterval(() => {
                setTime((time) => time + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [isActive, isPaused]);

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
    };

    const handlePauseResume = () => {
        setIsPaused(!isPaused);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsActive(false);
        setTime(0);
        setTaskName(taskName);
        console.log(time)

        props.finishTask()

        tasksService.addTask({
            taskName: taskName,
            taskTime: time
        });
    };


    return (
        <>
            <div className={styles.container}>
                <div className={styles.stopwatch}>
                    <div className={styles.cronometer}>
                        <span>
                            {("0" + Math.floor((time / 3600000) % 60)).slice(-2)}:
                        </span>
                        <span>
                            {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
                        </span>
                        <span >
                            {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
                        </span>
                    </div>
                </div>
                <label>
                    <div className={styles.icons}>
                        <i className="bi bi-play-fill" onClick={handleStart}></i>
                        <i className="bi bi-pause-fill" onClick={handlePauseResume}></i>
                    </div>
                </label>
                <form onSubmit={handleSubmit} >
                    <div>
                        <button>Finish</button>
                    </div>
                </form>
            </div>

        </>
    )
}

export default Stopwatch