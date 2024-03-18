"use client";

import { LogotypeSvg } from "./shared/svg/LogotypeSvg";
import styles from "@/styles/modules/logoName.module.scss";
import { COLORS } from "@/misc/colors";
import { useEffect, useRef, useState } from "react";
import { RunningTextLine, RunningLineItemHeader } from "./shared/RunningTextLine";
import type { TupleNum2 } from "@/types/tuples";
import { transformElementOnScroll } from "@/utils/transformElementOnScroll";
import { useScrollContext } from "@/hooks/useScrollContext";
import { TimerType } from "@/types/timerType";

// 1200 viewport width characteristics
// from Figma
const INIT_LOGO_DATA = {
	initViewportWidth: 1200,
	initWidth: 103,
	initHeight: 24,
	initScaledWidth: 1120, // in px on 1200 vp
	initScaledHeight: 260, // in px on 1200 vp
	maxScalerX: 15.4,
	maxScalerY: 15.4,
	getInitScalerX() {
		return this.initScaledWidth / this.initWidth;
	},
	getInitScalerY() {
		return this.initScaledHeight / this.initHeight;
	},
	getWidthProportion() {
		const scalerX = this.getInitScalerX();
		return scalerX / this.initViewportWidth;
	},
	getHeightProportion() {
		const scalerY = this.getInitScalerY();
		return scalerY / this.initViewportWidth;
	},
}

// ELEMENT TRANSFORMS
const ELEMENT_SCROLL_BORDERS = [0, 1500];
// distance for 1 scroll in px
const ELEMENT_TRANSLATE_Y_STEP = 55;
// initial translateY value in px
// need to correspond to CSS prop
const ELEMENT_TRANSLATE_BORDERS: TupleNum2 = [500, -100]

// text for running line
const runningLineText = ['бизнеса', 'города', 'человека', 'бренда', 'идеи', 'будущего', 'роста', 'успеха', 'шага вперёд'];

// RUNNING LINE TRANSFORMS
const LINE_TRANSLATE_X_BORDERS: TupleNum2 = [-300, 300];
const LINE_TRANSLATE_X_STEP = 50;

const LINE_TRANSLATE_Y_BORDERS: TupleNum2 = [0, -25];
const LINE_TRANSLATE_Y_STEP = 8;

const LINE_ROTATE_BORDERS: TupleNum2 = [3, -6];
const LINE_ROTATE_STEP = 0.95;

interface SvgScalerState {
	width: number;
	height: number;
}

// helper function for counting svg scalers on different viewport
const countSvgScalers = (viewportWidth: number): SvgScalerState => {

	let scalerX = viewportWidth * INIT_LOGO_DATA.getWidthProportion();
	let scalerY = viewportWidth * INIT_LOGO_DATA.getHeightProportion();      

	scalerX = scalerX > INIT_LOGO_DATA.maxScalerX ? INIT_LOGO_DATA.maxScalerX : scalerX;

	scalerY = scalerY > INIT_LOGO_DATA.maxScalerY ? INIT_LOGO_DATA.maxScalerY : scalerY;

	return {
		width: scalerX,
		height: scalerY,
	}
} 

// Component
const LogoName = () => {
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

				const shouldTransform = currentScroll >= ELEMENT_SCROLL_BORDERS[0] && currentScroll <= ELEMENT_SCROLL_BORDERS[1];
			
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


	// Logo Svg proper scaling
	const [svgScalerState, setSvgScalerState] = useState<SvgScalerState>(() => {
		let viewportWidth = INIT_LOGO_DATA.initViewportWidth;
		if (typeof document !== 'undefined') {
			viewportWidth = document.documentElement.clientWidth;
		}
		return countSvgScalers(viewportWidth);
	});

	// for debounce of resize event
	const resizeTimerRef = useRef<TimerType | null>(null);
	
	// listen for resize
	useEffect(() => {

		const handleResize = () => {
			if (resizeTimerRef.current != null) {
				clearTimeout(resizeTimerRef.current);
				resizeTimerRef.current = null;
			}

			resizeTimerRef.current = setTimeout(() => {
				const newViewportWidth = document.documentElement.clientWidth;
				const newState = countSvgScalers(newViewportWidth);
				setSvgScalerState(newState);
			}, 50);
		}

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);


	return (
		<div className={styles.logo__wrapper} ref={logoDOMRef}>
			<h1 className={styles.logo__heading}>
				Агенство территориального брендинга
			</h1>
			<LogotypeSvg
				fill={COLORS[4]}
				scaleX={svgScalerState.width}
				scaleY={svgScalerState.height}
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

export default LogoName;