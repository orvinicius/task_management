import styles from './Tasks.module.css';

// components
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import { Eye, Edit, Trash, Calendar as CalendarIcon } from 'react-feather';
import { Calendar } from "react-calendar";
import Modal from "../../components/Modal"


// hooks
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// Redux
import { getUserDetails } from "../../slices/userSlice";
import {
    deleteTask,
    getUserTasks,
    insertTask,
    resetMessage,
    updateTask
} from "../../slices/taskSlice";

const Tasks = () => {
    const userLocalStorage = localStorage.getItem("user");
    const localStorageId = JSON.parse(userLocalStorage)
    const id = localStorageId._id

    const taskLocalStorage = localStorage.getItem("task");
    console.log(taskLocalStorage)




    const dispatch = useDispatch();

    const { user, loading } = useSelector((state) => state.user);
    const { user: userAuth } = useSelector((state) => state.auth);
    const {
        tasks,
        loading: loadingTask,
        error: errorTask,
        message: messageTask,
    } = useSelector((state) => state.task);

    const [title, setTitle] = useState();
    const [task, setTask] = useState();

    // Edit Task
    const [editId, setEditId] = useState();
    const [editTask, setEditTask] = useState();
    const [editTitle, setEditTitle] = useState();

    // Calendar
    const [showCalendar, setShowCalendar] = useState(false);
    const [date, setDate] = useState(new Date());

    const [showModal, setShowModal] = useState(false);


    // // Load user data
    // useEffect(() => {
    //     dispatch(getUserTasks());
    // }, [dispatch, id]);

    // Reset component message
    function resetComponentMessage() {
        setTimeout(() => {
            dispatch(resetMessage());
        }, 2000);
    }

    // Publish a new task
    const submitHandle = (e) => {
        e.preventDefault();

        const taskData = {
            title,
            task,
        };

        // build form data
        const formData = new FormData();

        const taskFormData = Object.keys(taskData).forEach((key) =>
            formData.append(key, taskData[key])
        );

        formData.append("task", taskFormData);

        dispatch(insertTask(formData));

        setTitle("");

        resetComponentMessage();
    };


    // Exclude a task
    const handleDelete = (id) => {
        dispatch(deleteTask(id));

        resetComponentMessage();
    };



    // Show edit form
    const handleEdit = () => {

        if (showModal === false) {
            setShowModal(true)
        } else {
            setShowModal(false)
        }
    };


    // Update task title
    const handleUpdate = (e) => {
        e.preventDefault();

        const taskData = {
            title: editTitle,
            id: editId,
        };

        dispatch(updateTask(taskData));

        resetComponentMessage();
    };

    if (loading) {
        return <p>Carregando...</p>;
    }


    const handleChange = () => {

        if (showCalendar === false) {
            setShowCalendar(true)
        } else {
            setShowCalendar(false)
        }


        console.log(date)

    }


    return (
        <div className={styles.tasks}>

            <div className={styles.container}>
                <ul>
                    <li>
                        <button onClick={() => handleChange()}>
                            <span>Calendário</span>
                            <span>
                                <CalendarIcon
                                />
                            </span>
                        </button>
                    </li>
                </ul>
                <div className={styles.calendar}>
                    <Calendar
                        className={showCalendar ? "" : "hide"}
                        onChange={setDate}
                        defaultValue={date}

                    />
                </div>

            </div>
            <div>
                <h2>Tarefas:</h2>
                <div>
                    {tasks &&
                        tasks.map((task) => (
                            <div className={styles.task} key={task._id}>
                                {task && (
                                    <p>{task.taskTitle}</p>
                                )}
                                {id === userAuth._id ? (
                                    <div >
                                        <Edit onClick={() => handleEdit()} />
                                        <Trash onClick={() => handleDelete(task._id)} />
                                    </div>
                                ) : (
                                    <></>
                                )}
                                <div>
                                    <Modal showModal={showModal} setShowModal={setShowModal} className={showModal ? "" : "hide"} />
                                </div>
                            </div>
                        ))}
                    {tasks.length === 0 && <p>Não há tarefas pendentes...</p>}
                </div>
            </div>
        </div>
    );
};

export default Tasks;