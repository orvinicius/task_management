import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";

//CSS
import styles from "./TaskForm.module.css";




const TaskForm = ({
    btnText,
    taskList,
    task,
    handleUpdate,
}) => {

    const [taskTitle, setTaskTitle] = useState("");
    // const [difficulty, setDifficulty] = useState < number > (0);

    useEffect(() => {
        if (task) {

            setTaskTitle(task.taskTitle);

        }
    }, [task]);

    const addTaskHandler = (e) => {
        e.preventDefault();

        if (handleUpdate) {
            handleUpdate(taskTitle);
        } else {


            const newTask = { taskTitle };

            setTaskTitle("");

        }
    };

    const handleChange = (e) => {
        if (e.target.name === "taskTitle") {
            setTaskTitle(e.target.value);
        }
    };

    return (
        <form onSubmit={addTaskHandler} className={styles.form}>
            <div className={styles.input_container}>
                <label htmlFor="taskTitle">Título: </label>
                <input
                    type="text"
                    name="title"
                    placeholder="Título da tarefa"
                    onChange={handleChange}
                    value={taskTitle}
                />
            </div>
            <input type="submit" value={btnText} />
        </form>
    );
};

export default TaskForm;
