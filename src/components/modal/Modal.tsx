import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './modal.module.css'

interface ModalProps {
    isOpen: boolean;
    closeModal: () => void;
    children: React.ReactNode
}

const Modal = function({isOpen, closeModal, children}: ModalProps) {

    const modalRoot = document.getElementById('modals');
    return ReactDOM.createPortal(
        <AnimatePresence>
            {isOpen && ( 
            <motion.div
                className={styles.modal}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className={styles.overlay} onClick={closeModal} />
                <motion.div
                className={styles.popup}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.5 }}
                transition={{ duration: 0.3 }}
                >
                {children}
                <button className={styles.button} onClick={closeModal}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                </motion.div>
            </motion.div>
            )}
      </AnimatePresence>,
            modalRoot!
        );
}

export default Modal