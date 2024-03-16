'use client';

import styles from "@/styles/modules/textWithCopy.module.scss";

interface TextWithCopyProps {
    text: string;
    color: 'dark' | 'light';
}

export const TextWithCopy = (props: TextWithCopyProps) => {

    return (
        <div className={styles.textWrapper} data-cursor-scaler={true}
            data-color={props.color}
        >
            <span>{props.text}</span>
            <span>{props.text}</span>
        </div>
    )
};