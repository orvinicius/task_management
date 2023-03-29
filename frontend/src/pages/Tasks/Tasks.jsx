import styles from './Tasks.module.css';

// components
import { Edit, Trash, Calendar as CalendarIcon, X } from 'react-feather';
import { Calendar } from "react-calendar";



// hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import {
    deleteTask,
    getUserTasks,
    resetMessage,
    updateTask
} from "../../slices/taskSlice";

const Tasks = () => {
    const userLocalStorage = localStorage.getItem("user");
    const localStorageId = JSON.parse(userLocalStorage)
    const id = localStorageId._id




    const dispatch = useDispatch();

    const { loading } = useSelector((state) => state.user);
    const { user: userAuth } = useSelector((state) => state.auth);
    const { tasks } = useSelector((state) => state.tasks);

    const [title, setTitle] = useState();



    // Edit Task
    const [editId, setEditId] = useState();

    // Calendar
    const [showCalendar, setShowCalendar] = useState(false);

    const [date, setDate] = useState(new Date());

    const taskDate = new Date(date).toDateString();

    const taskDay = date.getDate()

    const taskMonth = date.getMonth() + 1


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

            setTitle(titleTask?.taskTitle)
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


    const showCalendarModal = () => {

        if (showCalendar === false) {
            setShowCalendar(true)
        }



    }
    const handleChange = (e) => {

        setShowCalendar(false)

        setDate(e)
        console.log(date)


    }

    const tasksFiltered = tasks.filter((task) =>
        task.taskDate === taskDate
    )






    return (
        <div className={styles.tasks}>

            <div className={styles.container}>
                <ul>
                    <li>
                        <button onClick={() => showCalendarModal()}>
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
                        onClickDay={handleChange}
                        value={date}

                    />
                </div>

            </div>
            <div>
                <h2>Tarefas:</h2>
                <div>
                    {handleChange ?
                        tasks &&
                        tasks.filter((task) => task.Date === taskDate) &&
                        tasksFiltered.map((task) => (
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
                        ))
                        :
                        tasks &&
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
                    {(tasks.length === 0 || tasksFiltered.length === 0) && <p>Não há tarefas do dia <span>{taskDay}</span>/<span>{taskMonth}</span>...</p>}

                </div>
            </div>
        </div>
    );
};

export default Tasks;