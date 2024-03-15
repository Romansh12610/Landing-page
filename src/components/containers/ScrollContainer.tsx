'use client';
import styles from "@/styles/modules/scrollContainer.module.scss";
import { useEffect, useRef } from "react";
import { scrollElementTop } from "@/utils/scrollElementTop";

interface ScrollContainerProps {
    children: React.ReactNode;
}

// scroll distance in px per 1 wheel event
const SCROLL_STEP = 110;
const SCROLL_START = 0;
const HEIGHT_OF_CONTAINER = 9000;

export const ScrollContainer = ({ children }: ScrollContainerProps) => {

    const scrollContainerDOMRef = useRef<HTMLDivElement | null>(null);
    const CURRENT_SCROLL_VALUE = useRef(SCROLL_START);
    // raw value
    const MAX_SCROLL_VALUE = useRef({
        settled: false,
        value: 8000,
    });

    // get max scroll value on mount
    useEffect(() => {
        // if set value already - return
        if (MAX_SCROLL_VALUE.current.settled) return;

        if (typeof document !== 'undefined') {

            MAX_SCROLL_VALUE.current.value = HEIGHT_OF_CONTAINER - document.documentElement.clientHeight;

            MAX_SCROLL_VALUE.current.settled = true;
        }
    }, []);

    // disable default scroll
    // add custom scroll
    useEffect(() => {

        const handleCustomScroll = (e: WheelEvent) => {
            e.preventDefault();

            scrollElementTop(
                e, 
                scrollContainerDOMRef,
                CURRENT_SCROLL_VALUE,
                SCROLL_STEP,
                SCROLL_START,
                MAX_SCROLL_VALUE.current.value,
            );
        };

        document.addEventListener('wheel', handleCustomScroll);

        return () => {
            document.removeEventListener('wheel', handleCustomScroll);
        }

    }, []);

    return (
        <div className={styles.scrollContainer}
            ref={scrollContainerDOMRef}
        >
            {children}
        </div>
    )
};