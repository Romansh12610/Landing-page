import { EyeSvg } from "../shared/svg/EyeSvg";
import styles from "@/styles/modules/page.module.scss";

export const DescriptionBlock = () => {

    return (
        <div className={styles.main__description_wrapper}>
            <span className={styles.main__descrition_spanSvg}>Мы создаем <EyeSvg /> уникальные</span> бренды основываясь на глубоком понимании 
            потребителей
        </div>
    )
};