import styles from "@/styles/modules/services/smallCard.module.scss";
import { StarCrossedSvg } from "../svg/services/StarCrossedSvg";

interface SmallCardProps {
    title: string;
    description: string;
}
export const ServiceSmallCard = ({ title, description}: SmallCardProps) => {

    return (
        <div className={styles.card__wrapper}
            data-cursor-scaler={true}
        >
            <StarCrossedSvg />
            <h3 className={styles.card__title}>{title}</h3>
            <p className={styles.card__description}>{description}</p>
        </div>
    )
};