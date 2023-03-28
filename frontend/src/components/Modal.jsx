// CSS
import styles from "./Modal.module.css";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";

import { X } from "react-feather";

import Message from "./Message";

// Hooks
import { useSelector, useDispatch } from "react-redux";

// Redux
import { updateTask, getTaskByID, getUserTasks } from "../slices/taskSlice";



const Modal = ({ showModal, setShowModal, editId, handleEdit }) => {


    const userLocalStorage = localStorage.getItem("user");
    const localStorageId = JSON.parse(userLocalStorage)
    const id = localStorageId._id






    const dispatch = useDispatch();

    // Load user data
    useEffect(() => {
        dispatch(getUserTasks(id));
    }, [dispatch, id]);

    const {
        tasks,
        task,
        loading,
        error,
        message,
    } = useSelector((state) => state.tasks);

    const [taskTitle, setTaskTitle] = useState('');
    const [taskId, setTaskId] = useState()




    // fill user form
    useEffect(() => {
        if (handleEdit) {

            const title = tasks?.find((task) =>
                task._id === editId
            )

            setTaskTitle(title?.taskTitle)
            setTaskId(title?._id)

        }
    }, [handleEdit]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        // Gather user data from states
        const taskData = {
            title: taskTitle,
            taskId: editId

        };



        await dispatch(updateTask(taskData));


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
                    <form onSubmit={handleUpdate} className={styles.form}>
                        <div className={styles.input_container}>
                            <label>Título: </label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Título da tarefa"
                                onChange={(e) => {
                                    setTaskTitle(e.target.value)
                                }}
                                value={taskTitle || ""}
                            />
                        </div>
                        {!loading && <input type="submit" value="Editar Task" />}
                        {loading && <input type="submit" disabled value="Aguarde..." />}

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Modal;