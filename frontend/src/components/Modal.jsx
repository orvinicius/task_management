// CSS
import styles from "./Modal.module.css";

import TaskForm from "./TaskForm"


const Modal = ({ showModal }) => {
    if (!showModal) {
        return null
    }
    return (
        <div id="modal" className="hide">
            <div className={styles.fade}></div>
            <div className={styles.modal}>
                <h1>Editar Tarefa</h1>
                <TaskForm />
            </div>
        </div>
    );
};

export default Modal;