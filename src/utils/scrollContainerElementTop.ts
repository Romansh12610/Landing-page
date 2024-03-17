import { TupleNum2 } from "@/types/tuples";

/**
 * @description - this function constructured only for scrollContainer parent (one with custom scroll applying). It should not be used with other elements for transformations. 
 */

interface ScrollElementTopArgs {
    e: WheelEvent, 
    elementDOMref: React.RefObject<HTMLElement | null>,
    // to scroll updates 
    currentScrollValueRef: React.MutableRefObject<number>,
    // to translateY of the container element updates
    scrollBorders: TupleNum2,
    translateYValueRef: React.MutableRefObject<number>,
    // step is similar for both
    // except *-1 for translate
    step: number,
    translateBorders: TupleNum2,
    translationUnit: 'px' | 'percent',
}

export const scrollContainerElementTop = ({
    e,
    elementDOMref,
    currentScrollValueRef,
    translateYValueRef,
    scrollBorders,
    step,
    translateBorders,
    translationUnit,
}: ScrollElementTopArgs) => {
        
    if (elementDOMref.current == null) return;

    // scroll down 
    if (e.deltaY > 0) {
        // scroll update
        const remainScroll = scrollBorders[1] - currentScrollValueRef.current;
        
        if (step <= remainScroll) {
            currentScrollValueRef.current += step;
        }
        else {
            currentScrollValueRef.current += remainScroll;
        }

        // translateY update
        //log
        
        const remainTranslate = Math.abs(translateBorders[1]) - Math.abs(translateYValueRef.current);

        if (step <= remainTranslate) {
            translateYValueRef.current -= step;
        }
        else {
            translateYValueRef.current -= remainTranslate;
        }
    }

    // scroll up
    else {
        const remainScroll = currentScrollValueRef.current;
        
        // update scroll
        if (step <= remainScroll) {
            currentScrollValueRef.current -= step;
        }
        else {
            currentScrollValueRef.current -= remainScroll;
        }

        // update translate
        const remainTranslate = Math.abs(translateYValueRef.current);

        if (step <= remainTranslate) {
            translateYValueRef.current += step;
        }
        else {
            translateYValueRef.current += remainTranslate;
        }
    }

    // request animation with updated transform
    requestAnimationFrame(() => {
        if (elementDOMref.current == null) return;

        elementDOMref.current.style.transform = `translateY(${translateYValueRef.current}${translationUnit})`;
    });
};