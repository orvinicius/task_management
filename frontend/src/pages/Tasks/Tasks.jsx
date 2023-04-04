import styles from './Tasks.module.css';

// components
import { Edit, Trash, Calendar as CalendarIcon, X, PlusCircle } from 'react-feather';
import { Calendar } from "react-calendar";



// hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
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

    const { loading } = useSelector((state) => state.user);
    const { user: userAuth } = useSelector((state) => state.auth);
    const { tasks } = useSelector((state) => state.tasks);


    const [title, setTitle] = useState();



    // Edit Task
    const [editId, setEditId] = useState();
    const [editModal, setEditModal] = useState(false);


    const [status, setStatus] = useState("Pendente")
    const [currentStatus, setCurrentStatus] = useState()


    useEffect(() => {
        if (document.querySelector('input[name="status"]')) {
            document.querySelectorAll('input[name="status"]').forEach((elem) => {
                elem.addEventListener("change", function (e) {
                    setStatus(e.target.value)
                });

            });

        }




    }, [editModal])


    // Calendar
    const [showCalendar, setShowCalendar] = useState(false);

    const [date, setDate] = useState(new Date());

    const taskDate = new Date(date).toDateString();

    const taskDay = date.getDate()

    const taskMonth = date.getMonth() + 1

    const tasksFiltered = tasks.filter((task) =>
        task.taskDate === taskDate
    )



    const [insertModal, setInsertModal] = useState(false);



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


    ///////// EDIT TASK ///////////

    // Show edit form
    const handleEdit = (id) => {


        if (editModal === false) {
            setEditModal(true)

        } else {
            setEditModal(false)
        }

        // console.log(id)

        setEditId(id)




    };

    //Cancel editing
    const handleCancelEdit = () => {
        setEditModal(false)
    };

    // Update task title
    const handleUpdate = (e) => {
        e.preventDefault();

        const taskData = {
            taskTitle: title,
            id: titleTask?._id,
            taskStatus: status

        };

        dispatch(updateTask(taskData));

        resetComponentMessage();
        setEditModal(false);
    };






    /////// INSERT TASK ///////////////////////////////////

    const handleInsert = () => {


        if (insertModal === false) {
            setInsertModal(true)
        } else {
            setInsertModal(false)
        }

    };

    // Cancel inserting task
    const handleCancelInsert = () => {
        setInsertModal(false)
    };

    // insert task 
    const handleInsertTask = (e) => {
        e.preventDefault();

        const task = {
            taskTitle: title,
            id: titleTask?._id,
            taskStatus: status
        };

        dispatch(insertTask(task));

        resetComponentMessage();

        setInsertModal(false);
    };



    ///////// CALENDAR /////////////////////////////////
    const showCalendarModal = () => {

        if (showCalendar === false) {
            setShowCalendar(true)
        }

        else {
            setShowCalendar(false)
        }



    }
    const handleChange = (e) => {

        setShowCalendar(false)

        setDate(e)
        console.log(date)
    }



    if (loading) {
        return <p>Carregando...</p>;
    }



    return (
        <div className={styles.tasks}>
            <div className={styles.container}>
                <div className={styles.buttons}>
                    <ul>
                        <li>
                            <button onClick={() => showCalendarModal()}>
                                <span>
                                    <CalendarIcon
                                    />
                                </span>
                                <span>Calendário</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleInsert()}>
                                <span>
                                    <PlusCircle
                                    />
                                </span>
                                <span>Inserir Tarefa</span>
                            </button>
                        </li>
                    </ul>
                </div>
                <div className={styles.calendar}>
                    <Calendar
                        className={showCalendar ? "" : "hide"}
                        onClickDay={handleChange}
                        value={date}

                    />
                </div>

            </div>
            <div className={styles.taskContainer}>
                <h2>Tarefas:</h2>
                <div>
                    {handleChange ?
                        tasks &&
                        tasks.filter((task) => task.Date === taskDate) &&
                        tasksFiltered.map((task) => (
                            <div className={styles.task} key={task._id}>
                                <div>
                                    {task && (
                                        <p>{task.taskTitle}</p>
                                    )}
                                    <p>STATUS: {task.taskStatus}</p>
                                </div>
                                {id === userAuth._id ? (
                                    <div >
                                        <Edit onClick={() => handleEdit(task._id)} />
                                        <Trash onClick={() => handleDelete(task._id)} />
                                    </div>
                                ) : (
                                    <></>
                                )}

                                {insertModal && <div id="modal" className={insertModal ? "" : "hide"}>
                                    <div className={styles.fade}></div>
                                    <div className={styles.modal}>
                                        <div>
                                            <X className={styles.close} onClick={handleCancelInsert} />
                                        </div>
                                        <h1>Inserir Tarefa</h1>
                                        <div id="modal" className="hide">
                                            <form onSubmit={handleInsertTask} className={styles.form}>
                                                <div className={styles.input_container}>
                                                    <label>Título: </label>
                                                    <input
                                                        type="text"
                                                        name="title"
                                                        placeholder="Título da tarefa"
                                                        onChange={(e) => {
                                                            setTitle(e.target.value)
                                                        }}
                                                    />
                                                </div>
                                                <div className={styles.statusContainer}>
                                                    <div className={styles.status}>
                                                        <label htmlFor="pendente">
                                                            <input type="radio" name='status' id='pendente' value='Pendente' defaultChecked={status === "Pendente"} />
                                                            <span>Pendente</span></label>
                                                    </div>
                                                    <div className={styles.status}>
                                                        <label htmlFor="concluída">
                                                            <input type="radio" name='status' id='concluída' value='Concluída' defaultChecked={status === "Concluída"} />
                                                            <span>Concluída</span></label>
                                                    </div>
                                                </div>
                                                {!loading && <input type="submit" value="Inserir Task" />}
                                                {loading && <input type="submit" disabled value="Aguarde..." />}

                                            </form>
                                        </div>
                                    </div>

                                </div>}

                                {editModal && <div id="modal" className="hide">
                                    <div className={styles.fade}></div>
                                    <div className={styles.modal}>
                                        <div>
                                            <X className={styles.close} onClick={handleCancelEdit} />
                                        </div>

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
                                                <div className={styles.mainStatusContainer}>
                                                    <fieldset><legend>Status</legend>
                                                        <div className={styles.statusContainer}>
                                                            <div className={styles.status}>
                                                                <label htmlFor="pendente">
                                                                    <input type="radio" name='status' id='pendente' value='Pendente' defaultChecked={status === "Pendente"} />
                                                                    <span>Pendente</span></label>
                                                            </div>
                                                            <div className={styles.status}>
                                                                <label htmlFor="concluída">
                                                                    <input type="radio" name='status' id='concluída' value='Concluída' defaultChecked={status === "Concluída"} />
                                                                    <span>Concluída</span></label>
                                                            </div>
                                                        </div>
                                                    </fieldset>
                                                </div>
                                                {!loading && <input type="submit" value="Salvar Task" />}
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
                                {insertModal && <div id="modal" className={insertModal ? "" : "hide"}>
                                    <div className={styles.fade}></div>
                                    <div className={styles.modal}>
                                        <div>
                                            <X className={styles.close} onClick={handleCancelInsert} />
                                        </div>
                                        <h1>Inserir Tarefa</h1>
                                        <div id="modal" className="hide">
                                            <form onSubmit={handleInsertTask} className={styles.form}>
                                                <div className={styles.input_container}>
                                                    <label>Título: </label>
                                                    <input
                                                        type="text"
                                                        name="title"
                                                        placeholder="Título da tarefa"
                                                        onChange={(e) => {
                                                            setTitle(e.target.value)
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <h2>Status</h2>
                                                </div>
                                                <div className={styles.statusContainer}>
                                                    <div className={styles.status}>
                                                        <label htmlFor="pendente">
                                                            <input type="radio" name='status' id='pendente' value='Pendente' defaultChecked={status === "Pendente"} />
                                                            <span>Pendente</span></label>
                                                    </div>
                                                    <div className={styles.status}>
                                                        <label htmlFor="concluída">
                                                            <input type="radio" name='status' id='concluída' value='Concluída' defaultChecked={status === "Concluída"} />
                                                            <span>Concluída</span></label>
                                                    </div>
                                                </div>
                                                {!loading && <input type="submit" value="Inserir Task" />}
                                                {loading && <input type="submit" disabled value="Aguarde..." />}

                                            </form>
                                        </div>
                                    </div>

                                </div>}
                                {editModal && <div id="modal" className="hide">
                                    <div className={styles.fade}></div>
                                    <div className={styles.modal}>
                                        <div>
                                            <X className={styles.close} onClick={handleCancelEdit} />
                                        </div>
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
                                                    <div>
                                                        <h2>Status</h2>
                                                    </div>
                                                    <div className={styles.statusContainer}>
                                                        <div className={styles.status}>
                                                            <label htmlFor="pendente">
                                                                <input type="radio" name='status' id='pendente' value='Pendente' defaultChecked={status === "Pendente"} />
                                                                <span>Pendente</span></label>
                                                        </div>
                                                        <div className={styles.status}>
                                                            <label htmlFor="concluída">
                                                                <input type="radio" name='status' id='concluída' value='Concluída' defaultChecked={status === "Concluída"} />
                                                                <span>Concluída</span></label>
                                                        </div>
                                                    </div>
                                                </div>
                                                {!loading && <input type="submit" value="Salvar Task" />}
                                                {loading && <input type="submit" disabled value="Aguarde..." />}

                                            </form>
                                        </div>
                                    </div>

                                </div>}
                            </div>
                        ))}
                    {(tasks.length === 0 || tasksFiltered.length === 0) && <p>Não há tarefas do dia <span>{taskDay}</span>/<span>{taskMonth}</span>...</p>}
                    {insertModal && <div id="modal" className={insertModal ? "" : "hide"}>
                        <div className={styles.fade}></div>
                        <div className={styles.modal}>
                            <div>
                                <X className={styles.close} onClick={handleCancelInsert} />
                            </div>
                            <h1>Inserir Tarefa</h1>
                            <div id="modal" className="hide">
                                <form onSubmit={handleInsertTask} className={styles.form}>
                                    <div className={styles.input_container}>
                                        <label>Título: </label>
                                        <input
                                            type="text"
                                            name="title"
                                            placeholder="Título da tarefa"
                                            onChange={(e) => {
                                                setTitle(e.target.value)
                                            }}
                                        />
                                    </div>
                                    {!loading && <input type="submit" value="Inserir Task" />}
                                    {loading && <input type="submit" disabled value="Aguarde..." />}

                                </form>
                            </div>
                        </div>

                    </div>}

                </div>
            </div>
        </div>
    );
};

export default Tasks;