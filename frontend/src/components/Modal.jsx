// CSS
import styles from "./Modal.module.css";

import TaskForm from "./TaskForm"


const Modal = () => {
    return (
        <div id="modal" className="hide">
            <div className={styles.modal}>
                <h1>Editar Tarefa</h1>
                <TaskForm />
            </div>
        </div>
    );
};

export default Modal;