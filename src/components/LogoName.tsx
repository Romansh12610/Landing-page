import { LogotypeSvg } from "./shared/LogotypeSvg";
import styles from "@/styles/modules/logoName.module.scss";
import { COLORS } from "@/misc/colors";

const BIG_LOGO_WIDTH = 1120;
const BIG_LOGO_HEIGHT = 260;

// how many scale Logo svg
const X_SVG_SCALER = BIG_LOGO_WIDTH / 103;
const Y_SVG_SCALER = BIG_LOGO_HEIGHT / 24;

export const LogoName = () => {

    return (
        <div className={styles.logo__wrapper}>
            <h1 className={styles.logo__heading}>Агенство территориального брендинга</h1>
            <LogotypeSvg 
                width={103} 
                height={24}
                fill={COLORS[4]}
                scaleX={X_SVG_SCALER}
                scaleY={Y_SVG_SCALER}
                shouldScaleCursor={false} 
            />
        </div>
    )
};