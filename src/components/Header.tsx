'use client';

import styles from "@/styles/modules/header.module.scss";
import { TextWithCopy } from "./shared/TextWithCopy";
import { BtnWithTextCopy } from "./shared/BtnWithTextCopy";
import { LogotypeSvg } from "./shared/svg/LogotypeSvg";
import { COLORS } from "@/misc/colors";
import { MenuBtn } from "./MenuBtn";
import type { TimerType } from "@/types/timerType";
import { useEffect, useRef, useState } from "react";


const Header = () => {

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

    // decide to render Nav menu or Burget btn menu
    const viewportWidthRef = useRef(document.documentElement.clientWidth);
    const [shouldRenderNav, setIsShouldRenderNav] = useState(() => viewportWidthRef.current >= 1200);
    const resizeTimerRef = useRef<TimerType | null>(null);

    useEffect(() => {

        const handleResize = () => {
            // using throttling to delay function if used frequently
            if (resizeTimerRef.current != null) {
                clearTimeout(resizeTimerRef.current);
                resizeTimerRef.current = null;
            }

            resizeTimerRef.current = setTimeout(() => {
                viewportWidthRef.current = document.documentElement.clientWidth;

                if (viewportWidthRef.current >= 1200) {
                    setTimeout(() => setIsShouldRenderNav(true), 0);
                }

                else {
                    setTimeout(() => setIsShouldRenderNav(false), 0);
                }

            }, 150);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }

    }, []);

    return (
        <header className={styles.header}
            ref={headerDOMRef}
            data-desktop={shouldRenderNav}
        >
            <LogotypeSvg 
                width={103} 
                height={24}
                fill={COLORS[0]}
                shouldScaleCursor={true} 
            />
            {shouldRenderNav ? (
                <nav className={styles.header__nav}>
                    <ul className={styles.header__nav_list}>
                        <li>
                            <TextWithCopy text="Услуги" color='light' />
                        </li>
                        <li>
                            <TextWithCopy text="Кейсы" color='light' />
                        </li>
                        <li>
                            <TextWithCopy text="Контакты" color='light' />
                        </li>
                    </ul>
                    <BtnWithTextCopy text="Обсудить задачу" mode="small" />
                </nav>
            )   :   (
                <MenuBtn />
            )}
        </header>
    )
};


export default Header;