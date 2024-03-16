import styles from "@/styles/modules/btnWithTextCopy.module.scss";

interface BtnWithTextProps {
    text: string;
    mode: 'large' | 'big' | 'small';
}

export const BtnWithTextCopy = (props: BtnWithTextProps) => {
    
    return (
        <button className={styles.btnWrapper} 
            data-cursor-scaler={true}
            data-mode={props.mode}
        >
            <span>{props.text}</span>
            <span>{props.text}</span>
        </button>
    )
};