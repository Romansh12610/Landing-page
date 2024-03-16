'use client';

import styles from "@/styles/modules/services/tabUnderline.module.scss";

interface TabProps {
    text: string;
    isSelected: boolean;
    onClick: () => void;
}

export const TabWithUnderline = ({ text, isSelected, onClick }: TabProps) => {

    return (
        <button
            className={styles.tab_btn_underline}
            data-cursor-scaler={true}
            data-selected={isSelected}
            onClick={onClick}
        >
            {text}
            <span className={styles.tab_btn_counter}>6</span>
        </button>
    )
}