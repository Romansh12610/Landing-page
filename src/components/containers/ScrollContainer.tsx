'use client';

import styles from "@/styles/modules/scrollContainer.module.scss";
import { useEffect, useRef, useState } from "react";
import { scrollContainerElementTop } from "@/utils/scrollContainerElementTop";
import { TupleNum2 } from "@/types/tuples";
import { ScrollContext } from "@/hooks/useScrollContext";
import { useBackdropContext } from "@/hooks/useBackdropContext";
import { TimerType } from "@/types/timerType";

interface ScrollContainerProps {
    children: React.ReactNode;
}

// scroll distance in px per 1 wheel event
const SCROLL_STEP = 105;
const SCROLL_START = 0;
const SCROLL_END_RAW = 3700;

interface ScrollBorderState {
    borders: TupleNum2;
    isSettled: boolean;
}

interface TranslateBorderState {
    borders: TupleNum2;
    isSettled: boolean;
}


// helper func
function getDocumentScrollHeight(containerRef: React.RefObject<HTMLElement | null>) {
    if (containerRef && containerRef.current) {
        // height of the whole document - height of the viewport
        const pageHeight = containerRef.current.scrollHeight - document.documentElement.clientHeight * 1.25;

        return pageHeight;
    }
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
        isSettled: false,
    });

    // borders for translate
    // are same as for SCROLL
    // but end value is negative
    const [translateBordersState, setTranslateBordersState] = useState<TranslateBorderState>({
        borders: [SCROLL_START, SCROLL_END_RAW * -1],
        isSettled: false,
    });

    // get actual SCROLL_END border
    useEffect(() => {
        if (typeof document !== 'undefined' && scrollContainerDOMRef.current) {

            const ACTUAL_SCROLL_END = getDocumentScrollHeight(scrollContainerDOMRef);

            if (!ACTUAL_SCROLL_END) return;

            setScrollBordersState({
                borders: [SCROLL_START, ACTUAL_SCROLL_END],
                isSettled: true,
            });
            
            setTranslateBordersState({
                borders: [SCROLL_START, ACTUAL_SCROLL_END * -1],
                isSettled: true,
            });
        }
    }, []);


    // change scrollHeight on resize
    useEffect(() => {

        const handleResize = () => {
            if (typeof document !== 'undefined' && scrollContainerDOMRef.current) {
                const ACTIAL_SCROLL_END = getDocumentScrollHeight(scrollContainerDOMRef);

                if (!ACTIAL_SCROLL_END) return;

                setScrollBordersState({
                    borders: [SCROLL_START, ACTIAL_SCROLL_END],
                    isSettled: true,
                });

                setTranslateBordersState({
                    borders: [SCROLL_START, ACTIAL_SCROLL_END * -1],
                    isSettled: true,
                });
            }
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);

    }, []);


    // getting context of backdrop
    // to prevent scroll when it is open
    const backdropContext = useBackdropContext();
    // disable default scroll
    // add custom scroll
    useEffect(() => {

        const handleCustomScroll = (e: WheelEvent) => {
            e.preventDefault();

            console.log('current scroll: ', scrollValueRef.current);

            // if not actual states
            if (scrollBordersState.isSettled === false || translateBordersState.isSettled === false) return;

            // if does not have refs
            if (scrollValueRef.current == null || translateValueRef.current == null || backdropContext == null) return;

            const currentScrollValue = scrollValueRef.current;
            const { isBackdropOpen } = backdropContext;

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


    // do not transform any children before 1200 viewport width
    const [canScrollChildren, setCanScrollChildren] = useState(false);
    const resizeTimerRef = useRef<TimerType | null>(null);

    useEffect(() => {

        const handleResize = () => {
            if (typeof document !== 'undefined') {
                if (resizeTimerRef.current) {
                    clearTimeout(resizeTimerRef.current);
                    resizeTimerRef.current = null;
                }
    
                resizeTimerRef.current = setTimeout(() => {
                    const currentVPWidth = document.documentElement.clientWidth;
                    if (currentVPWidth < 1200) {
                        setCanScrollChildren(false);
                    }
                    else {
                        setCanScrollChildren(true);
                    }
                }, 100);
            }
        };  

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);

    }, []);

    return (
        <div className={styles.scrollContainer}
            ref={scrollContainerDOMRef}
        >
            <ScrollContext.Provider value={{
                currentScrollValue: scrollValueRef,
                scrollEndDistance: scrollBordersState.borders[1],
                canScrollChildren,
            }}>
                {children}
            </ScrollContext.Provider>
        </div>
    )
};