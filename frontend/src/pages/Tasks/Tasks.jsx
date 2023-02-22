import styles from './Tasks.module.css';

// components
import Message from "../../components/Message";
import { Link } from "react-router-dom";

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
    updateTask,
    taskSlice
} from "../../slices/taskSlice";

const Tasks = () => {
    const { id } = useParams();

    const dispatch = useDispatch();

    const { user, loading } = useSelector((state) => state.user);
    const { user: userAuth } = useSelector((state) => state.auth);
    const {
        tasks,
        loading: loadingTask,
        error: errorTask,
        message: messageTask,
    } = useSelector((state) => state.tasks);

    const [title, setTitle] = useState();
    const [task, setTask] = useState();

    const [editId, setEditId] = useState();
    const [editTask, setEditTask] = useState();
    const [editTitle, setEditTitle] = useState();

    // New form and edit form refs
    const newTaskForm = useRef();
    const editTaskForm = useRef();

    // Load user data
    useEffect(() => {
        dispatch(getUserDetails(id));
        dispatch(getUserTasks(id));
    }, [dispatch, id]);

    // Reset component message
    function resetComponentMessage() {
        setTimeout(() => {
            dispatch(resetMessage());
        }, 2000);
    }

    // Publish a new photo
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

    // Update photo title
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

    return (
        <div id="tasks">
            <div className="profile-header">
                {user.profileImage && (
                    <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
                )}
                <div className="profile-description">
                    <h2>{user.name}</h2>
                    <p>{user.bio}</p>
                </div>
            </div>
            {id === userAuth._id && (
                <>
                    <div className="new-photo" ref={newPhotoForm}>
                        <h3>Compartilhe algum momento seu:</h3>
                        <form onSubmit={submitHandle}>
                            <label>
                                <span>Título para a foto:</span>
                                <input
                                    type="text"
                                    placeholder="Insira um título"
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title || ""}
                                />
                            </label>
                            <label>
                                <span>Imagem:</span>
                                <input type="file" onChange={handleFile} />
                            </label>
                            {!loadingPhoto && <input type="submit" value="Postar" />}
                            {loadingPhoto && (
                                <input type="submit" disabled value="Aguarde..." />
                            )}
                        </form>
                    </div>
                    <div className="edit-photo hide" ref={editPhotoForm}>
                        <p>Editando:</p>
                        {editImage && (
                            <img src={`${uploads}/photos/${editImage}`} alt={editTitle} />
                        )}
                        <form onSubmit={handleUpdate}>
                            <input
                                type="text"
                                onChange={(e) => setEditTitle(e.target.value)}
                                value={editTitle || ""}
                            />
                            <input type="submit" value="Atualizar" />
                            <button className="cancel-btn" onClick={handleCancelEdit}>
                                Cancelar edição
                            </button>
                        </form>
                    </div>
                    {errorPhoto && <Message msg={errorPhoto} type="error" />}
                    {messagePhoto && <Message msg={messagePhoto} type="success" />}
                </>
            )}
            <div className="user-photos">
                <h2>Fotos publicadas:</h2>
                <div className="photos-container">
                    {photos &&
                        photos.map((photo) => (
                            <div className="photo" key={photo._id}>
                                {photo.image && (
                                    <Link className="" to={`/photos/${photo._id}`}>
                                        <img
                                            src={`${uploads}/photos/${photo.image}`}
                                            alt={photo.title}
                                            dir={`/photos/${photo._id}`}
                                        />
                                    </Link>
                                )}
                                {id === userAuth._id ? (
                                    <div className="actions">
                                        <Link to={`/photos/${photo._id}`}>
                                            <BsFillEyeFill />
                                        </Link>
                                        <BsPencilFill onClick={() => handleEdit(photo)} />
                                        <BsXLg onClick={() => handleDelete(photo._id)} />
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </div>
                        ))}
                    {photos.length === 0 && <p>Ainda não há fotos publicadas...</p>}
                </div>
            </div>
        </div>
    );
};

export default Profile;
