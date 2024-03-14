'use client';

import styles from "@/styles/modules/textWithCopy.module.scss";

interface TextWithCopyProps {
    text: string;
}

export const TextWithCopy = (props: TextWithCopyProps) => {

    return (
        <div className={styles.textWrapper} data-cursor-scaler={true}>
            <span>{props.text}</span>
            <span>{props.text}</span>
        </div>
    )
};