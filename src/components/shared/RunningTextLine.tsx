'use client';

import styles from "@/styles/modules/runningLine.module.scss";
import { ArrowSvg } from "./svg/ArrowSvg";
import { useRef, useEffect } from 'react';
import { transformElementOnScroll } from "@/utils/transformElementOnScroll";
import type { TupleNum2 } from "@/types/tuples";

// Бегущая строка
type DirectionOfTransform = 'posToNeg' | 'negToPos';

type LineTransformOptions = {
    translateX: {
        borders: TupleNum2;
        step: number;
        direction: DirectionOfTransform;
    },
    rotate: {
        borders: TupleNum2;
        step: number;
        direction: DirectionOfTransform;
    }
};

interface RunningLineProps {
    children: React.ReactNode;
    mode: 'small' | 'big';
    transforms: LineTransformOptions;
}


export const RunningTextLine = ({ children, mode, transforms }: RunningLineProps) => {

    const lineDOMRef = useRef<HTMLDivElement | null>(null);
    const translateXRef = useRef(transforms.translateX.borders[0]);
    const rotateRef = useRef(transforms.rotate.borders[0]);

    // directions
    const translateDirection = transforms.translateX.direction === 'posToNeg' 
                                ? true 
                                : false;

    const rotateDirection = transforms.rotate.direction === 'posToNeg' 
                                ? true 
                                : false;


    useEffect(() => {

        const handleScroll = (e: WheelEvent) => {
            e.preventDefault();
            if (lineDOMRef.current == null) return;

            transformElementOnScroll(
                e, 
                lineDOMRef,
                // translateX
                {
                    step: transforms.translateX.step,
                    currentValueRef: translateXRef,
                    borders: transforms.translateX.borders,
                    fromPositiveToNegative: translateDirection,
                },
                // translateY
                undefined,
                // rotate
                {
                    step: transforms.rotate.step,
                    currentValueRef: rotateRef,
                    borders: transforms.rotate.borders,
                    fromPositiveToNegative: rotateDirection,
                }
            )
        };

        document.addEventListener('wheel', handleScroll);

        return () => document.removeEventListener('wheel', handleScroll);

    }, []);

    return (
        <div className={styles.runningLine__wrapper}
            ref={lineDOMRef}
            data-mode={mode}
        >
            {children}
        </div>
    )
};


// for Header
interface RunningLineItemProps {
    text: string;
}
export const RunningLineItemHeader = ({ text }: RunningLineItemProps) => {
    return (
        <span className={styles.runningLine__item_big}>
            <span>для</span>
            <span>{text}</span>
            <ArrowSvg width={35} height={29} />
        </span>
    )
};


// for other small lines
export const RunningLineItemSmall = ({ text }: RunningLineItemProps) => {

    return (
        <span className={styles.runningLine__item_small}>
            <span>{text}</span>
            <ArrowSvg width={20} height={20} />
        </span>
    )
};