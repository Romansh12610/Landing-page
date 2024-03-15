
/**
 * @description this is simple function for applying single transform (translateY) on element
 */
export const scrollElementTop = (
        e: WheelEvent, 
        elementDOMref: React.RefObject<HTMLElement | null>, 
        currentScrollRef: React.MutableRefObject<number>,
        scrollStep: number,
        scrollStartBorder: number,
        scrollEndBorder: number,
    ) => {
        
    if (elementDOMref.current == null || currentScrollRef.current == null) return;

    // scroll down (negative)
    if (e.deltaY > 0) {
        let remainScroll = Math.abs(currentScrollRef.current - scrollEndBorder);

        if (scrollStep <= remainScroll) {
            currentScrollRef.current -= scrollStep;

            requestAnimationFrame(() => {
                if (elementDOMref.current != null) {
                    elementDOMref.current.style.transform = `translateY(${currentScrollRef.current}px)`;
                }
            });
        }

        // scroll to end
        else {
            currentScrollRef.current = scrollEndBorder;

            requestAnimationFrame(() => {
                if (elementDOMref.current != null) {
                    elementDOMref.current.style.transform = `translateY(${currentScrollRef.current}px)`;
                }
            });
        }
    }

    // scroll up (positive)
    else {
        let remainScroll = Math.abs(scrollStartBorder - currentScrollRef.current);

        if (scrollStep <= remainScroll) {
            currentScrollRef.current += scrollStep;

            requestAnimationFrame(() => {
                if (elementDOMref.current != null) {
                    elementDOMref.current.style.transform = `translateY(${currentScrollRef.current}px)`;
                }
            });
        }

        // scroll to start
        else {
            currentScrollRef.current += remainScroll;

            requestAnimationFrame(() => {
                if (elementDOMref.current != null) {
                    elementDOMref.current.style.transform = `translateY(${currentScrollRef.current}px)`;
                }
            });
        }
    }
};