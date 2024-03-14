import styles from "@/styles/modules/header.module.scss";
import { TextWithCopy } from "./shared/TextWithCopy";
import { BtnWithTextCopy } from "./shared/BtnWithTextCopy";

export const Header = () => {

    return (
        <header className={styles.header}>
            <a className={styles.logo} href="/" 
                data-cursor-scaler={true}
            >Место</a>
            <nav className={styles.header__nav}>
                <ul className={styles.header__nav_list}>
                    <li>
                        <TextWithCopy text="Услуги" />
                    </li>
                    <li>
                        <TextWithCopy text="Кейсы" />
                    </li>
                    <li>
                        <TextWithCopy text="Контакты" />
                    </li>
                </ul>
                <BtnWithTextCopy text="Обсудить задачу" />
            </nav>
        </header>
    )
};