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
    const [task, setTask] = useState();

    const [editId, setEditId] = useState();
    const [editTask, setEditTask] = useState();
    const [editTitle, setEditTitle] = useState();
    const [showCalendar, setShowCalendar] = useState(false);

    // New form and edit form refs
    const newTaskForm = useRef();
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

    // Show or hide forms
    function hideOrShowForms() {
        newTaskForm.current.classList.toggle("hide");
        editTaskForm.current.classList.toggle("hide");
    }

    // Show edit form
    const handleEdit = (task) => {
        if (editTaskForm.current.classList.contains("hide")) {
            hideOrShowForms();
        }

        setEditId(task._id);
        setEditTitle(task.title);
    };

    // Cancel editing
    const handleCancelEdit = () => {
        hideOrShowForms();
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
        setShowCalendar(false);
    };

    return (
        <div className={styles.tasks}>
            <ul>
                <li>
                    <span>Calendário</span>
                    <span>
                        <CalendarIcon
                            onClick={() => setShowCalendar(true)}
                        />
                    </span>
                </li>
            </ul>
            <div>
                <Calendar
                    className={showCalendar ? "" : "hide"}

                    onChange={handleChange}
                />
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
                                    <div >
                                        <Link to={`/tasks/${task._id}`}>
                                            <Eye />
                                        </Link>
                                        <Edit onClick={() => handleEdit(task)} />
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
