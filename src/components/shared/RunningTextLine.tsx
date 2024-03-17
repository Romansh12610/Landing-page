"use client";

import styles from "@/styles/modules/runningLine.module.scss";
import { ArrowSvg } from "./svg/ArrowSvg";
import { useRef, useEffect } from "react";
import { transformElementOnScroll } from "@/utils/transformElementOnScroll";
import type { TupleNum2 } from "@/types/tuples";
import type { HorizontalDirection, VerticalDirection, RotateDirection } from "@/utils/transformElementOnScroll";

// Running line
type LineTransformOptions = {
	translateX: {
		borders: TupleNum2;
		step: number;
	};
	translateY: {
		borders: TupleNum2;
		step: number;
	};
	rotate: {
		borders: TupleNum2;
		step: number;
	};
};

interface RunningLineProps {
	children: React.ReactNode;
	mode: "small" | "big";
	// where to start / end animation
	// depend on scroll Top value
	animationScrollBorders: TupleNum2;
	transforms: LineTransformOptions;
}

export const RunningTextLine = ({

	children,
	mode,
	animationScrollBorders,
	transforms,

}: RunningLineProps) => {

	const lineDOMRef = useRef<HTMLDivElement | null>(null);
	const translateXRef = useRef(transforms.translateX.borders[0]);
	const translateYRef = useRef(transforms.translateY.borders[0]);
	const rotateRef = useRef(transforms.rotate.borders[0]);

	// directions
	const translateDirectionX: HorizontalDirection = transforms.translateX.borders[0] > transforms.translateX.borders[1] ? 'rtl' : 'ltr';

	const translateDirectionY: VerticalDirection = transforms.translateY.borders[0] > transforms.translateY.borders[1] ? 'bt' : 'tb';

	const rotateDirection: RotateDirection = transforms.rotate.borders[0] > transforms.rotate.borders[1] ? 'clockWise' : 'counterClockwise';

	useEffect(() => {
		const handleScroll = (e: WheelEvent) => {
			e.preventDefault();
			if (lineDOMRef.current == null) return;

            // start end logic
            let shouldTransform = (e.deltaY > 0 && (window.scrollY >= animationScrollBorders[0] && window.scrollY <= animationScrollBorders[1])) 
				|| (e.deltaY < 0 && (window.scrollY <= animationScrollBorders[1] && window.scrollY >= animationScrollBorders[0]));
			
            if (shouldTransform) {
                // transformations
                transformElementOnScroll(
                    e,
                    lineDOMRef,
                    // translateX
                    {
                        step: transforms.translateX.step,
                        currentValueRef: translateXRef,
                        borders: transforms.translateX.borders,
                        direction: translateDirectionX,
                    },
                    // translateY
                    {
                        step: transforms.translateY.step,
                        currentValueRef: translateYRef,
                        borders: transforms.translateY.borders,
                        direction: translateDirectionY,
                    },
                    // rotate
                    {
                        step: transforms.rotate.step,
                        currentValueRef: rotateRef,
                        borders: transforms.rotate.borders,
                        direction: rotateDirection,
                    }
                );
            }
		};

		document.addEventListener("wheel", handleScroll);

		return () => document.removeEventListener("wheel", handleScroll);
	}, []);

	return (
		<div
			className={styles.runningLine__wrapper}
			ref={lineDOMRef}
			data-mode={mode}
		>
			{children}
		</div>
	);
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
	);
};

// for other small lines
export const RunningLineItemSmall = ({ text }: RunningLineItemProps) => {
	return (
		<span className={styles.runningLine__item_small}>
			<span>{text}</span>
			<ArrowSvg width={35} height={29} />
		</span>
	);
};
