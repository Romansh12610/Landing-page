"use client";

import { LogotypeSvg } from "./shared/svg/LogotypeSvg";
import styles from "@/styles/modules/logoName.module.scss";
import { COLORS } from "@/misc/colors";
import { useEffect, useRef } from "react";
import { RunningTextLine, RunningLineItemHeader } from "./shared/RunningTextLine";
import type { TupleNum2 } from "@/types/tuples";
import { transformElementOnScroll } from "@/utils/transformElementOnScroll";
import { useScrollContext } from "@/hooks/useScrollContext";

const BIG_LOGO_WIDTH = 1120;
const BIG_LOGO_HEIGHT = 260;

// how many scale Logo svg
const X_SVG_SCALER = BIG_LOGO_WIDTH / 103;
const Y_SVG_SCALER = BIG_LOGO_HEIGHT / 24;

// ELEMENT TRANSFORMS

const ELEMENT_SCROLL_BORDERS = [0, 1500];
// distance for 1 scroll in px
const ELEMENT_TRANSLATE_Y_STEP = 43;
// initial translateY value in px
const ELEMENT_TRANSLATE_BORDERS: TupleNum2 = [500, 50]

// text for running line
const runningLineText = ['бизнеса', 'города', 'человека', 'бренда', 'идеи', 'будущего', 'роста', 'успеха', 'шага вперёд'];

// RUNNING LINE TRANSFORMS
const LINE_TRANSLATE_X_BORDERS: TupleNum2 = [-300, 300];
const LINE_TRANSLATE_X_STEP = 50;

const LINE_TRANSLATE_Y_BORDERS: TupleNum2 = [0, -25];
const LINE_TRANSLATE_Y_STEP = 8;

const LINE_ROTATE_BORDERS: TupleNum2 = [3, -6];
const LINE_ROTATE_STEP = 0.95;


export const LogoName = () => {
	const logoDOMRef = useRef<HTMLDivElement | null>(null);
	const elementTranslateYRef = useRef(ELEMENT_TRANSLATE_BORDERS[0]);
	const scrollCurrentValueRef = useScrollContext();

	useEffect(() => {

		const handleCustomScroll = (e: WheelEvent) => {
			e.preventDefault();

			// accessing custom scroll value
			// in context 
			if (scrollCurrentValueRef && 
				scrollCurrentValueRef.currentScrollValue != null && 
				scrollCurrentValueRef.currentScrollValue.current != null) {

				const currentScroll = scrollCurrentValueRef.currentScrollValue.current ?? window.scrollY;

				const shouldTransform = (e.deltaY > 0 && (currentScroll >= ELEMENT_SCROLL_BORDERS[0] && currentScroll <= ELEMENT_SCROLL_BORDERS[1])) 
				|| (e.deltaY < 0 && (currentScroll <= ELEMENT_SCROLL_BORDERS[1] && currentScroll >= ELEMENT_SCROLL_BORDERS[0]));
			
				// transform element if scroll inside 'scroll window of element'
				if (shouldTransform) {
					transformElementOnScroll(
						e,
						logoDOMRef,
						undefined,
						{
							step: ELEMENT_TRANSLATE_Y_STEP,
							borders: ELEMENT_TRANSLATE_BORDERS,
							currentValueRef: elementTranslateYRef,
							direction: 'bt',
						}
					);
				}
			}

			/* const shouldTransform = (e.deltaY > 0 && (window.scrollY >= ELEMENT_SCROLL_BORDERS[0] && window.scrollY <= ELEMENT_SCROLL_BORDERS[1])) 
				|| (e.deltaY < 0 && (window.scrollY <= ELEMENT_SCROLL_BORDERS[1] && window.scrollY >= ELEMENT_SCROLL_BORDERS[0]));
			
			// transform element if scroll inside 'scroll window of element'
            if (shouldTransform) {
				transformElementOnScroll(
					e,
					logoDOMRef,
					undefined,
					{
						step: ELEMENT_TRANSLATE_Y_STEP,
						borders: ELEMENT_TRANSLATE_BORDERS,
						currentValueRef: elementTranslateYRef,
						direction: 'bt',
					}
				);
			} */
		};

		document.addEventListener("wheel", handleCustomScroll);

		return () => document.removeEventListener("wheel", handleCustomScroll);
	}, []);


    // content for running line
    const renderingLineItems = runningLineText.map(text => {
        return (
            <RunningLineItemHeader key={text} text={text} />
        )
    });


	return (
		<div className={styles.logo__wrapper} ref={logoDOMRef}>
			<h1 className={styles.logo__heading}>
				Агенство территориального брендинга
			</h1>
			<LogotypeSvg
				width={103}
				height={24}
				fill={COLORS[4]}
				scaleX={X_SVG_SCALER}
				scaleY={Y_SVG_SCALER}
				shouldScaleCursor={false}
			/>
            <div className={styles.logo__textLine_wrapper}>
                <RunningTextLine 
					mode='big'
					animationScrollBorders={[0, 1500]}
					transforms={{
						translateX: {
							step: LINE_TRANSLATE_X_STEP,
							borders: LINE_TRANSLATE_X_BORDERS,
						},
						translateY: {
							step: LINE_TRANSLATE_Y_STEP,
							borders: LINE_TRANSLATE_Y_BORDERS,
						},
						rotate: {
							step: LINE_ROTATE_STEP,
							borders: LINE_ROTATE_BORDERS,
						}
					}}
				>
                    {renderingLineItems}
                </RunningTextLine>
            </div>
		</div>
	);
};