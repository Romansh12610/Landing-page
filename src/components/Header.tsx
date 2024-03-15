'use client';

import styles from "@/styles/modules/header.module.scss";
import { TextWithCopy } from "./shared/TextWithCopy";
import { BtnWithTextCopy } from "./shared/BtnWithTextCopy";
import { LogotypeSvg } from "./shared/svg/LogotypeSvg";
import { COLORS } from "@/misc/colors";

import { useEffect, useRef } from "react";

export const Header = () => {

    const headerDOMRef = useRef<HTMLHeadElement | null>(null);

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (!headerDOMRef.current) return;

            // if scroll bottom
            if (e.deltaY > 0) {
                headerDOMRef.current.dataset.hidden = 'true';
            }
            // if scroll top
            else {
                headerDOMRef.current.dataset.hidden = 'false';
            }
        }

        document.addEventListener('wheel', handleWheel);

        return () => {
            document.removeEventListener('wheel', handleWheel);
        }
    }, []);

    return (
        <header className={styles.header}
            ref={headerDOMRef}
        >
            <LogotypeSvg 
                width={103} 
                height={24}
                fill={COLORS[0]}
                shouldScaleCursor={true} 
            />
            <nav className={styles.header__nav}>
                <ul className={styles.header__nav_list}>
                    <li>
                        <TextWithCopy text="Услуги" />
                    </li>
                    <li>
                        <TextWithCopy text="Кейсы" />
                    </li>
                    <li>
                        <TextWithCopy text="Контакты" />
                    </li>
                </ul>
                <BtnWithTextCopy text="Обсудить задачу" />
            </nav>
        </header>
    )
};