'use client';

import { useEffect, useRef, useState } from "react";
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
    step: 43,
    borders: {
        scroll: [2600, 3400],
        translateY: [400, 120],
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

        const handleCustomScroll = (e: WheelEvent) => {
            e.preventDefault();

            if (!scrollContext) return;

            const currentScrollValue = scrollContext.currentScrollValue.current;

             // viewport < 1200 --> cant scroll children 
            const { canScrollChildren } = scrollContext;
            if (!canScrollChildren) return;

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
        
    }, [scrollContext]);

    return (
        <div className={styles.btnContainer}
            ref={elemendDOMRef}
        >
            <BtnWithTextCopy text="Все услуги" mode="big" />
			<LargeBtnGradient text="Обсудить задачу" />
        </div>
    )
};