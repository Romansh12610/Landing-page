import { createPortal } from "react-dom";
import styles from "@/styles/modules/backdrop.module.scss";
import { m, Variants } from "framer-motion";
import { TextWithCopy } from "./shared/TextWithCopy";

// animation
const backdropVariants: Variants = {
    enter: { 
        opacity: 1,
        transition: {
            duration: 1,
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 1,
        }
    }
}

const Backdrop = () => {

    const BackdropComponent = (
        <m.div 
            className={styles.backdrop}
            variants={backdropVariants}
            animate='enter'
            exit='exit'
        >
            <nav className={styles.backdrop__nav}>
                <ul className={styles.backdrop__nav_list}>
                    <li>
                        <TextWithCopy text="Услуги" color='light' />
                    </li>
                    <li>
                        <TextWithCopy text="Кейсы" color='light' />
                    </li>
                    <li>
                        <TextWithCopy text="Контакты" color='light' />
                    </li>
                </ul>
            </nav>
        </m.div>
    );

    return (
        createPortal(BackdropComponent, document.body)
    )
};

export default Backdrop;