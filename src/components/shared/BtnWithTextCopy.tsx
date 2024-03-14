import styles from "@/styles/modules/btnWithTextCopy.module.scss";

interface BtnWithTextProps {
    text: string;
}

export const BtnWithTextCopy = (props: BtnWithTextProps) => {
    
    return (
        <button className={styles.btnWrapper} data-cursor-scaler={true}>
            <span>{props.text}</span>
            <span>{props.text}</span>
        </button>
    )
};