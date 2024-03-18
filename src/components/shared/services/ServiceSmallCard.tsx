import styles from "@/styles/modules/services/smallCard.module.scss";
import { StarCrossedSvg } from "../svg/services/StarCrossedSvg";
import type { SvgSizeType } from "@/components/containers/services/ServicesAdditionalContainer";

interface SmallCardProps {
    title: string;
    description: string;
    svgSize: SvgSizeType;
}
export const ServiceSmallCard = ({ title, description, svgSize }: SmallCardProps) => {

    return (
        <div className={styles.card__wrapper}
            data-cursor-scaler={true}
        >
            <StarCrossedSvg size={svgSize} />
            <h3 className={styles.card__title}>{title}</h3>
            <p className={styles.card__description}>{description}</p>
        </div>
    )
};