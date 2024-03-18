'use client';
import styles from "@/styles/modules/menuBtn.module.scss";
import { useState } from "react";
import { useBackdropContext } from "@/hooks/useBackdropContext";

export const MenuBtn = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // using backdrop context
    const backdropContext = useBackdropContext();

    const handleBtnClick = () => {
        if (backdropContext != null) {
            setIsMenuOpen(!isMenuOpen);
            backdropContext.toggleBackdrop();
        }
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