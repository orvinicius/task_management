import styles from './Dashboard.module.css';

import tasksService from '../../services/tasksService'

// hooks
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';

// Redux
import { getUserDetails } from "../../slices/userSlice";
import { getUserTasks } from "../../slices/taskSlice";

const Dashboard = () => {

    const userLocalStorage = localStorage.getItem("user");
    const localStorageId = JSON.parse(userLocalStorage)
    const id = localStorageId._id


    const dispatch = useDispatch();

    const { user, loading } = useSelector((state) => state.user);
    const { user: userAuth } = useSelector((state) => state.auth);
    const {
        tasks,
        loading: loadingTask,
        error: errorTask,
        message: messageTask,
    } = useSelector((state) => state.task);


    // Load user data
    // useEffect(() => {
    //     dispatch(getUserDetails(id));
    // }, [dispatch]);

    useEffect(() => {
        dispatch(getUserTasks(id));
    }, [dispatch]);



    //get tasks time
    const tasksTime = tasks.map((time) => {
        return time.taskTime

    })
    console.log(tasksTime)

    if (loading) {
        return <p>Carregando...</p>;
    }


    return (
        <div className={styles.container}>
            <div>
                <p className={styles.p}>Hello, {userAuth.name}!</p>
            </div>

            <div>
                <p className={styles.tag}>Daily Overview </p>
            </div>
            <div className={styles.tasks_count}>
                <div className={styles.clock}>
                    <img src={require('../../assets/clock-icon.png')} alt="clock icon" />
                    <span><p>
                        {/* esperar o valor carregar */}
                        {("0" + Math.floor((tasksTime.reduce((timeSum, time) => {
                            return timeSum + time
                        }) / 3600000) % 60)).slice(-2)}:

                        {("0" + Math.floor((tasksTime.reduce((timeSum, time) => {
                            return timeSum + time
                        }) / 60000) % 60)).slice(-2)}:

                        {("0" + Math.floor((tasksTime.reduce((timeSum, time) => {
                            return timeSum + time
                        }) / 1000) % 60)).slice(-2)}

                    </p></span>
                </div>
                <div className={styles.tasks}>
                    <span><p>{tasks.length}</p></span>
                    <img src={require('../../assets/task-icon.png')} alt="task icon" />
                </div>
            </div>
            <div className={styles.graphic_container}>
                <div className={styles.graphic}></div>
            </div>
            <div className={styles.newTask}>
                <button>New Task</button>
            </div>
        </div>
    )
}

export default Dashboard