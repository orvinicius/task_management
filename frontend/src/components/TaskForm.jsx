import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";

//CSS
import styles from "./TaskForm.module.css";

// Hooks
import { useSelector, useDispatch } from "react-redux";

// Redux
import { updateTask, getUserTasks } from "../slices/taskSlice";
import Modal from "./Modal";




const TaskForm = () => {

    const userLocalStorage = localStorage.getItem("user");
    const localStorageId = JSON.parse(userLocalStorage)
    const id = localStorageId._id

    const dispatch = useDispatch();

    const {
        tasks,
        task,
        loading: loadingTask,
        error: errorTask,
        message: messageTask,
    } = useSelector((state) => state.task);

    const [taskTitle, setTaskTitle] = useState("");
    // const [difficulty, setDifficulty] = useState < number > (0);

    // Load user tasks
    useEffect(() => {
        dispatch(getUserTasks(id));
    }, [dispatch]);

    // fill user form
    useEffect(() => {
        if (task) {
            setTaskTitle(task.taskTitle);

        }
    }, [task]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Gather user data from states
        const taskData = {
            taskTitle,
        };


        // build form data
        const formData = new FormData();

        const taskFormData = Object.keys(taskData).forEach((key) =>
            formData.append(key, taskData[key])
        );

        formData.append("task", taskFormData);

        await dispatch(updateTask(formData));


    };


    return (
        <div id="modal" className="hide">
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.input_container}>
                    <label>Título: </label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Título da tarefa"
                        onChange={(e) => setTaskTitle(e.target.value)}
                        value={taskTitle}
                    />
                </div>
                <input type="submit" value="Editar Task" />
            </form>
        </div>
    );
};

export default TaskForm;
