'use client';
import styles from "@/styles/modules/cursor.module.scss";
import { useEffect, useRef } from "react";

export const Cursor = () => {

    const cursorDOMRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // move custom cursor
        const handleCursorMove = (e: MouseEvent) => {
            if (cursorDOMRef.current != null) {
                // 12 === half of width / height of cursor
                cursorDOMRef.current.style.top = e.clientY - 12 + 'px';
                cursorDOMRef.current.style.left = e.clientX - 12 + 'px';
            }
        };

        // mouse enter on a/button --> scale cursor
        const handleCursorOver = (e: MouseEvent) => {
            // already scaled - return;
            if (!cursorDOMRef.current) return;

            // custom attrib used to identify element
            const relevantTarget = (e.target as HTMLElement).closest('[data-cursor-scaler]');

            if (!relevantTarget) return;

            cursorDOMRef.current.style.transform = 'scale(1.8)';
        };


        const handleCursorOut = (e: MouseEvent) => {
            if (!cursorDOMRef.current) return;

            const relatedTarget = e.relatedTarget as HTMLElement;

            if (relatedTarget && !relatedTarget.closest('[data-cursor-scaler]')) {
                cursorDOMRef.current.style.transform = 'scale(1)';
            }
        }


        document.addEventListener('mousemove', handleCursorMove);
        document.addEventListener('mouseover', handleCursorOver);
        document.addEventListener('mouseout', handleCursorOut);
        
        return () => {
            document.removeEventListener('mousemove', handleCursorMove);
            document.removeEventListener('mouseover', handleCursorOver);
            document.removeEventListener('mouseover', handleCursorOut);
        };

    }, []);

    return (
        <div
            ref={cursorDOMRef}
            className={styles.cursor}
        ></div>
    )
};