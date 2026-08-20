import { useEffect } from "react";
import { createPortal} from "react-dom";
import styles from "./Modal.module.css";
import closeIcon from "../../assets/icons/common/close.svg";

export default function Modal({ isOpen, onClose, labelledBy, children }) {
    useEffect(() => {
        if(!isOpen) return ;

        function handleKeyDown(event) {
            if (event.key === "ESCAPE") {
                onClose();
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div className={styles.overlay} onClick={onClose}>
            <div
                className={styles.sheet}
                role="dialog"
                aria-modal="true"
                aria-labelledby={labelledBy}
                onClick={(event) => event.stopPropagation()}
            >
                        <button
                            type="button"
                            className={styles.closeButton}
                            onClick={onClose}
                            aria-label="닫기"
                            >
                            <img className={styles.closeIcon} src={closeIcon} alt="" />
                        </button>


                {children}
            </div>
        </div>,
        document.body
    );
}