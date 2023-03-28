import styles from './Tasks.module.css';

// components
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import { Eye, Edit, Trash, Calendar as CalendarIcon, X } from 'react-feather';
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
    getTaskByID,
    insertTask,
    resetMessage,
    updateTask
} from "../../slices/taskSlice";

const Tasks = () => {
    const userLocalStorage = localStorage.getItem("user");
    const localStorageId = JSON.parse(userLocalStorage)
    const id = localStorageId._id


    const taskLocalStorage = localStorage.getItem("tasks");
    const localStorageTaskId = JSON.parse(taskLocalStorage)
    const taskId = localStorageTaskId

    const dispatch = useDispatch();

    const { user, loading } = useSelector((state) => state.user);
    const { user: userAuth } = useSelector((state) => state.auth);
    const {
        tasks: tasks,
        loading: loadingTask,
        error: errorTask,
        message: messageTask,
    } = useSelector((state) => state.tasks);

    const [title, setTitle] = useState();
    const [taskTitleId, setTaskTitleId] = useState()


    // New form and edit form refs
    const newTaskForm = useRef();
    const editTaskForm = useRef();


    // Edit Task
    const [editId, setEditId] = useState();

    // Calendar
    const [showCalendar, setShowCalendar] = useState(false);
    const [date, setDate] = useState(new Date());

    const [showModal, setShowModal] = useState(false);


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

    const titleTask = tasks?.find((task) =>
        task._id === editId
    )

    // fill user form
    useEffect(() => {
        if (handleEdit) {
            setEditId(titleTask?._id)
            console.log(editId)

            setTitle(titleTask?.taskTitle)
            setTaskTitleId(titleTask?._id)
        }
    }, [editId, tasks]);

    // Exclude a task
    const handleDelete = (id) => {
        dispatch(deleteTask(id));

        resetComponentMessage();
    };



    // Show edit form
    const handleEdit = (id) => {


        if (showModal === false) {
            setShowModal(true)
        } else {
            setShowModal(false)
        }

        // console.log(id)

        setEditId(id)




    };

    // Cancel editing
    const handleCancelEdit = () => {
        setShowModal(false)
    };

    // Update task title
    const handleUpdate = (e) => {
        e.preventDefault();

        const taskData = {
            title: title,
            id: titleTask?._id,
        };

        dispatch(updateTask(taskData));

        resetComponentMessage();
        setShowModal(false);
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
                                        <Edit onClick={() => handleEdit(task._id)} />
                                        <Trash onClick={() => handleDelete(task._id)} />
                                    </div>
                                ) : (
                                    <></>
                                )}
                                {showModal && <div id="modal" className="hide">
                                    <div className={styles.fade}></div>
                                    <div className={styles.modal}>
                                        <div>
                                            <X className={styles.close} onClick={handleCancelEdit} />
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
                                                            setTitle(e.target.value)
                                                        }}
                                                        value={title || ""}
                                                    />
                                                </div>
                                                {!loading && <input type="submit" value="Editar Task" />}
                                                {loading && <input type="submit" disabled value="Aguarde..." />}

                                            </form>
                                        </div>
                                    </div>

                                </div>}
                            </div>
                        ))}
                    {tasks.length === 0 && <p>Não há tarefas pendentes...</p>}
                </div>
            </div>
        </div>
    );
};

export default Tasks;