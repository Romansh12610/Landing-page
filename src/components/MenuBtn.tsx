'use client';
import styles from "@/styles/modules/menuBtn.module.scss";
import { useState } from "react";


export const MenuBtn = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleBtnClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <button className={styles.menuBtn__container}
            data-cursor-scaler={true}
            data-open={isMenuOpen}
            onClick={handleBtnClick}
        >
            <div></div>
            <div></div>
            <div></div>
        </button>
    )
}