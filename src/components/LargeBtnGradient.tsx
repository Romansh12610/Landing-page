import styles from "@/styles/modules/largeBtn.module.scss";

interface LargeBtnProps {
    text: string;
}
export const LargeBtnGradient = ({ text }: LargeBtnProps) => {

    return (
        <button className={styles.largeBtn}
            data-cursor-scaler={true}
        >
            <span>{text}</span>
        </button>
    )
};