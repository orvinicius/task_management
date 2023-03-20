// CSS
import styles from "./Modal.module.css";


const Modal = ({ children }) => {
    const closeModal = (e) => {
        const modal = document.querySelector("#modal");
        modal.classList.add("hide");
    };
    return (
        <div id="modal" className="hide">
            <div className={styles.fade} onClick={closeModal}></div>
            <div className={styles.modal}>
                <h1>Editar Tarefa</h1>
                {children}
            </div>
        </div>
    );
};

export default Modal;