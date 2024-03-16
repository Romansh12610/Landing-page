
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
    if (e.deltaY > 0 && Math.abs(currentScrollRef.current) < scrollEndBorder) {

        console.log('scroll bottom');

        let remainScroll = scrollEndBorder - Math.abs(currentScrollRef.current);

        console.log('current scroll is: ', currentScrollRef.current);
        console.log('remain scroll: ', remainScroll);


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

            console.log('scroll to end');

            currentScrollRef.current -= remainScroll;

            requestAnimationFrame(() => {
                if (elementDOMref.current != null) {
                    elementDOMref.current.style.transform = `translateY(${currentScrollRef.current}px)`;
                }
            });
        }
    }

    // scroll up (positive)
    else if (e.deltaY < 0 && Math.abs(currentScrollRef.current) > scrollStartBorder) {
        let remainScroll = Math.abs(currentScrollRef.current) - scrollStartBorder;

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