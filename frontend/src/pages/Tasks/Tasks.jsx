import styles from './Tasks.module.css';

// components
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import { Eye, Edit, Trash, Calendar as CalendarIcon } from 'react-feather';
import { Calendar } from "react-calendar";


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
    const [taskTitle, setTaskTitle] = useState();

    const [taskList, setTaskList] = useState([]);
    const [taskUpdate, setTaskUpdate] = useState(null);

    const [editId, setEditId] = useState();
    const [editTitle, setEditTitle] = useState();
    const [showCalendar, setShowCalendar] = useState(false);
    const [date, setDate] = useState(new Date());

    // Edit form ref
    const editTaskForm = useRef();

    // Load user data
    useEffect(() => {
        dispatch(getUserTasks(id));
    }, [dispatch, id]);

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
            taskTitle,
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

    // Show or hide forms
    const hideOrShowModal = (display) => {
        const modal = document.querySelector("#modal");
        if (display) {
            modal.classList.remove("hide");
        } else {
            modal.classList.add("hide");
        }
    };

    const editTask = (task) => {
        hideOrShowModal(true);
        setTaskUpdate(task);
    };

    const updateTask = (taskTitle) => {
        const updatedTask = { taskTitle };

        const updatedItems = taskList.map((task) => {
            return task.id === updatedTask.id ? updatedTask : task;
        });

        setTaskList(updatedItems);

        hideOrShowModal(false);
    };
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
                                    <Link className={styles.link} to={`/tasks/${task._id}`}>
                                        <p>{task.taskTitle}</p>
                                    </Link>
                                )}
                                {id === userAuth._id ? (
                                    <div className={styles.actions} >
                                        <Link to={`/tasks/${task._id}`}>
                                            <Eye />
                                        </Link>
                                        <Edit onClick={() => editTask(task)} />
                                        <Trash onClick={() => handleDelete(task._id)} />
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </div>
                        ))}
                    {tasks.length === 0 && <p>Não há tarefas pendentes...</p>}
                </div>
            </div>
        </div>
    );

};

export default Tasks;
