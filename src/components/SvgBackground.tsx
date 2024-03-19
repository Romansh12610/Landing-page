"use client";

import styles from "@/styles/modules/svgRectangles.module.scss";
import { useState, useEffect, useRef } from "react";
import { TimerType } from "@/types/timerType";
import dynamic from "next/dynamic";
import type { RectAnimationType } from "@/components/shared/SvgRectangle";
import { RECT_ANIMATIONS } from "@/components/shared/SvgRectangle";

const SvgRectangle = dynamic(() => import("@/components/shared/SvgRectangle"), {
	ssr: false,
});

// sizes from figma
const DEFAULT_VIEWPORT_WIDTH = 1200;
// coords of rect for 1200 viewport width
const DEFAULT_RECT_COORDS = {
	width: 1652,
	height: 303,
	getScaleRatioX() {
		return this.width / DEFAULT_VIEWPORT_WIDTH;
	},
	getScaleRatioY() {
		return this.height / DEFAULT_VIEWPORT_WIDTH;
	}
};

interface RectScaleRatios {
	width: number;
	height: number;
}

interface ViewportCoordsState {
	widthQuarter: number;
	heightQuarter: number;
}

interface ViewportRef {
	width: number;
	height: number;
}

// helper functions
const countScalers = (viewportWidth: number): RectScaleRatios => {
	const newWidth = DEFAULT_RECT_COORDS.getScaleRatioX() * viewportWidth;
	const newHeight = DEFAULT_RECT_COORDS.getScaleRatioY() * viewportWidth;
	
	return {
		width: newWidth,
		height: newHeight,
	}
};

const countViewportQuarters = (viewportWidth: number, viewportHeight: number): ViewportCoordsState => {
	
	const widthQuarter = viewportWidth / 4;
	const heightQuarter = viewportHeight / 4;

	const newViewportCoordsState: ViewportCoordsState = {
		widthQuarter,
		heightQuarter,
	}

	return newViewportCoordsState;
}


// for rect animations
const getAnimationType = (): RectAnimationType => {
	const randomNum = Math.floor(Math.random() * RECT_ANIMATIONS.length);
	return RECT_ANIMATIONS[randomNum];
};

// component
const SvgBackground = () => {
	// scale rectangles relatively to viewport width / 1200
	const [rectCoordsState, setRectCoordsState] = useState<RectScaleRatios>(() => {
		if (typeof document !== 'undefined') {
			const viewportWidth = document.documentElement.clientWidth;
			return countScalers(viewportWidth);
		}
		else {
			return { 
				width: DEFAULT_RECT_COORDS.width,
				height: DEFAULT_RECT_COORDS.height,
			}
		}
	});

	// to find offsets x, y 
	// need to know 1 / 4 of viewport width / height
	const [viewportCoords, setViewportCoords] = useState<ViewportCoordsState>(() => {
		if (typeof document !== 'undefined') {
			const currentVPWidth = document.documentElement.clientWidth;
			const currentVPHeight = document.documentElement.clientHeight;

			const initState = countViewportQuarters(currentVPWidth, currentVPHeight);
			return initState;
		}
		else {
			return {
				widthQuarter: 1200 / 4,
				heightQuarter: 2000 / 4,
			}
		}
	});	

	// watch viewport
	const viewportRef = useRef<ViewportRef | null>(null);

	// on resize
	// actualize states
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
					const currentVPHeight = document.documentElement.clientHeight;

					const newRectState = countScalers(currentVPWidth);
					const newViewportState = countViewportQuarters(currentVPWidth, currentVPHeight); 

					setRectCoordsState(newRectState);
					setViewportCoords(newViewportState);

					// reset viewport
					viewportRef.current = {
						width: currentVPWidth,
						height: currentVPHeight,
					}
                }, 100);
            }
        };  

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

	// rendering CORE rectangles
	const { widthQuarter, heightQuarter } = viewportCoords;

	const renderingRects: JSX.Element[] = [];
	const RECTS_COUNT = 24;
	
	// for Y offset and colors
	let xFactor = 0;
	let yFactor = 0;
	let colorIndex = 0;

	for (let i = 0; i < RECTS_COUNT; i++) {

		const xOffset = xFactor * widthQuarter;
		const yOffset = yFactor * heightQuarter;
		
		const rectangle = (
			<SvgRectangle
				key={`${xOffset}_${yOffset}_${i*3}`} 
				xOffset={xOffset}
				yOffset={yOffset}
				width={rectCoordsState.width}
				height={rectCoordsState.height}
				colorIndex={colorIndex}
				animationType={getAnimationType()}
			/>
		);

		renderingRects.push(rectangle);

		// iterating xFactor & colorIndex
		xFactor++;
		colorIndex++;

		// each 4 iterations we change
		// color, factors
		if ((i + 1) % 4 === 0) {
			xFactor = 0;
			colorIndex = 0;
			yFactor++;
		}
	}

	// rendering additional rectangles
	// only yellow / purple for beauty
	let additionalRects: JSX.Element[] = []; 

	for (let i = 0; i < 10; i++) {
		//const isYellow = 
		// 1 === yellow, 3 === purple
		const colorInd = Math.floor(Math.random() * 3) + 1;

		const xFactor = Math.floor(Math.random() * 3);
		const yFactor = Math.floor(Math.random() * 3);

		let scalerFactor = (Math.random() * 2.15) + 1;

		let scaledWidth = scalerFactor * rectCoordsState.width;
		let scaledHeight = scalerFactor * rectCoordsState.height;

		// it should not be null here
		// check for TypeScript
		if (viewportRef.current != null) {
			if (viewportRef.current.width > 1000) {
				// do not scale to much on large screens
				if (scaledWidth > DEFAULT_RECT_COORDS.width) {
					scaledWidth = rectCoordsState.width;
				}
				if (scaledHeight > DEFAULT_RECT_COORDS.height) {
					scaledHeight = rectCoordsState.height;
				}
			}
			// on mobile scale more
			else if (viewportRef.current.width < 768) {
				const additionalScaler = Math.random() * 2.5 + 1.6;

				scaledWidth *= additionalScaler;
				scaledHeight *= additionalScaler;
			}
		}

		additionalRects.push(
			<SvgRectangle
				key={`${xFactor}_${yFactor}_${scaledWidth}`} 
				xOffset={xFactor * widthQuarter}
				yOffset={yFactor * heightQuarter}
				colorIndex={colorInd}
				width={scaledWidth}
				height={scaledHeight}
				animationType={getAnimationType()}
			/>
		);
	}

	return (
		<div className={styles.svgWrapper}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="100%"
				height="100%"
				viewBox="0 0 100% 100%"
			>
				{renderingRects}
				{additionalRects}
			</svg>
		</div>
	);
};

export default SvgBackground;