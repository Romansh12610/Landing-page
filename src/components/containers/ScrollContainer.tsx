'use client';

import styles from "@/styles/modules/scrollContainer.module.scss";
import { useEffect, useRef, useState, createContext } from "react";
import { scrollContainerElementTop } from "@/utils/scrollContainerElementTop";
import { TupleNum2 } from "@/types/tuples";
import { ScrollContext } from "@/hooks/useScrollContext";
import { useBackdropContext } from "@/hooks/useBackdropContext";

interface ScrollContainerProps {
    children: React.ReactNode;
}

// scroll distance in px per 1 wheel event
const SCROLL_STEP = 105;
const SCROLL_START = 0;
const SCROLL_END_RAW = 3700;

interface ScrollBorderState {
    borders: TupleNum2;
    isScrollEndSettled: boolean;
}

interface TranslateBorderState {
    borders: TupleNum2;
    isTranslateEndSettled: boolean;
}



// COMPONENT
export const ScrollContainer = ({ children }: ScrollContainerProps) => {

    const scrollContainerDOMRef = useRef<HTMLDivElement | null>(null);
    const scrollValueRef = useRef(SCROLL_START);
    const translateValueRef = useRef(SCROLL_START);

    // 3700 hardcoded into SCROLL_END
    // it will not work on every screen resolution
    // using effect to get actual height of scroll
    const [scrollBordersState, setScrollBordersState] = useState<ScrollBorderState>({
        borders: [SCROLL_START, SCROLL_END_RAW],
        isScrollEndSettled: false,
    });

    // borders for translate
    // are same as for SCROLL
    // but end value is negative
    const [translateBordersState, setTranslateBordersState] = useState<TranslateBorderState>({
        borders: [SCROLL_START, SCROLL_END_RAW * -1],
        isTranslateEndSettled: false,
    });


    // get actual SCROLL_END border
    useEffect(() => {
        // if settled, no need to reset
        if (scrollBordersState.isScrollEndSettled === true && translateBordersState.isTranslateEndSettled === true) return;

        if (typeof document !== 'undefined' && scrollContainerDOMRef.current != null) {
            // height of the whole document - height of the viewport
            const pageHeight = scrollContainerDOMRef.current.scrollHeight - document.documentElement.clientHeight * 1.25;

            const ACTUAL_SCROLL_END = pageHeight;

            setScrollBordersState({
                borders: [SCROLL_START, ACTUAL_SCROLL_END],
                isScrollEndSettled: true,
            });
            
            setTranslateBordersState({
                borders: [SCROLL_START, ACTUAL_SCROLL_END * -1],
                isTranslateEndSettled: true,
            });
        }
    }, []);

    // getting context of backdrop
    // to prevent scroll when it is open
    const backdropContext = useBackdropContext();
    // disable default scroll
    // add custom scroll
    useEffect(() => {

        const handleCustomScroll = (e: WheelEvent) => {
            e.preventDefault();

            // if not actual states
            if (scrollBordersState.isScrollEndSettled === false || translateBordersState.isTranslateEndSettled === false) return;

            // if does not have refs
            if (scrollValueRef.current == null || translateValueRef.current == null || backdropContext == null) return;

            const currentScrollValue = scrollValueRef.current;
            const { isBackdropOpen } = backdropContext;
            // log
            console.log('is backdrop open: ', isBackdropOpen);
            console.log('custom scroll now: ', currentScrollValue);

            // should transform and scroll?
            // backdrop needs to be closed
            const shouldScrollAndTransform = (currentScrollValue >= scrollBordersState.borders[0] && currentScrollValue <= scrollBordersState.borders[1]) && isBackdropOpen == false;

			// transform element if scroll inside 'scroll window of element'
            if (shouldScrollAndTransform) {
                scrollContainerElementTop({
                    e,
                    elementDOMref: scrollContainerDOMRef,
                    currentScrollValueRef: scrollValueRef,
                    translateYValueRef: translateValueRef,
                    scrollBorders: scrollBordersState.borders,
                    translateBorders: translateBordersState.borders,
                    step: SCROLL_STEP,
                    translationUnit: 'px',
                });
            }
        };

        document.addEventListener('wheel', handleCustomScroll);

        return () => {
            document.removeEventListener('wheel', handleCustomScroll);
        }

    }, [scrollBordersState, translateBordersState, backdropContext]);

    return (
        <div className={styles.scrollContainer}
            ref={scrollContainerDOMRef}
        >
            <ScrollContext.Provider value={{
                currentScrollValue: scrollValueRef,
            }}>
                {children}
            </ScrollContext.Provider>
        </div>
    )
};