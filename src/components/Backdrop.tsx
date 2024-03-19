import { createPortal } from "react-dom";
import styles from "@/styles/modules/backdrop.module.scss";
import { m, Variants } from "framer-motion";
import { TextWithCopy } from "./shared/TextWithCopy";
import { BtnWithTextCopy } from "./shared/BtnWithTextCopy";

// animation
const backdropVariants: Variants = {
    enter: { 
        opacity: 1,
        transition: {
            duration: 0.6,
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.6,
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
            <BtnWithTextCopy text="Обсудить задачу" mode="big" />
        </m.div>
    );

    return (
        createPortal(BackdropComponent, document.body)
    )
};

export default Backdrop;