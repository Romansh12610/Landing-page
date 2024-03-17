'use client';

import { useEffect, useRef } from "react";
import { LargeBtnGradient } from "../LargeBtnGradient";
import { BtnWithTextCopy } from "../shared/BtnWithTextCopy";
import { useScrollContext } from "@/hooks/useScrollContext";
import styles from "@/styles/modules/btnContainer.module.scss";
import { PropertyDescriptionTY, transformElementOnScroll } from "@/utils/transformElementOnScroll";
import { TupleNum2 } from "@/types/tuples";


type TransformsType = Omit<PropertyDescriptionTY, 'currentValueRef' | 'borders'> & {
    borders: {
        scroll: TupleNum2;
        translateY: TupleNum2;
    }
};
// transforms
const TRANSFORMS: TransformsType = {
    step: 55,
    borders: {
        scroll: [2650, 3500],
        translateY: [400, -515],
    },
    direction: 'bt',
} 

export const ButtonWrapper = () => {

    // get custom scroll value
    const scrollContext = useScrollContext();
    const elemendDOMRef = useRef<HTMLDivElement | null>(null);
    const translateYRef = useRef(TRANSFORMS.borders.translateY[0]);

    // scroll
    useEffect(() => {
        
        //log
        const coords = elemendDOMRef.current?.getBoundingClientRect();
        console.log('button wrapper starts on: ', coords?.top);

        const handleCustomScroll = (e: WheelEvent) => {
            e.preventDefault();

            const currentScrollValue = scrollContext?.currentScrollValue.current;

            if (elemendDOMRef.current != null && currentScrollValue != null) {
                // borders destructuring
                const [SCROLL_START, SCROLL_END] = TRANSFORMS.borders.scroll; 
                
                const shouldTransform = currentScrollValue >= SCROLL_START && currentScrollValue <= SCROLL_END;

                if (shouldTransform) {
                    transformElementOnScroll(
                        e,
                        elemendDOMRef,
                        undefined,
                        {
                            step: TRANSFORMS.step,
                            borders: TRANSFORMS.borders.scroll,
                            direction: TRANSFORMS.direction,
                            currentValueRef: translateYRef,
                        }
                    )
                }
            }
        };

        document.addEventListener('wheel', handleCustomScroll);

        return () => document.removeEventListener('wheel', handleCustomScroll);
        
    }, []);

    return (
        <div className={styles.btnContainer}
            ref={elemendDOMRef}
        >
            <BtnWithTextCopy text="Все услуги" mode="big" />
			<LargeBtnGradient text="Обсудить задачу" />
        </div>
    )
};