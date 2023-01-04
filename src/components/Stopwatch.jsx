import styles from './Stopwatch.module.css';

import { useEffect, useState } from 'react';

const Stopwatch = (props) => {

    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [time, setTime] = useState(0);

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

    const handleReset = () => {
        setIsActive(false);
        setTime(0);
        props.finishTask()
    };


    return (
        <>
            <div className={styles.stopwatch}>
                <div className={styles.cronometer}>
                    <span>
                        {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
                    </span>
                    <span>
                        {("0" + Math.floor((time / 1000) % 60)).slice(-2)}.
                    </span>
                    <span >
                        {("0" + ((time / 10) % 100)).slice(-2)}
                    </span>
                </div>
            </div>
            <div className={styles.icons}>
                <i className="bi bi-play-fill" onClick={handleStart}></i>
                <i className="bi bi-pause-fill" onClick={handlePauseResume}></i>
            </div>
            <div>
                <button onClick={handleReset}>Finish</button>
            </div>

        </>
    )
}

export default Stopwatch