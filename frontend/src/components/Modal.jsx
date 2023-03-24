// CSS
import styles from "./Modal.module.css";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";

import { X } from "react-feather";



// Hooks
import { useSelector, useDispatch } from "react-redux";

// Redux
import { updateTask, getTaskByID } from "../slices/taskSlice";



const Modal = ({ showModal, setShowModal }) => {



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
        dispatch(getTaskByID(id));
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
    if (!showModal) {
        return null
    }

    const closeModal = () => {

        setShowModal(false)

    }

    return (
        <div id="modal" className="hide">
            <div className={styles.fade}></div>
            <div className={styles.modal}>
                <div>
                    <X className={styles.close} onClick={closeModal} />
                </div>
                <h1>Editar Tarefa</h1>
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
            </div>
        </div>
    );
};

export default Modal;