"use client";

import styles from "@/styles/modules/svgRectangles.module.scss";
import { COLORS } from "@/misc/colors";
import { useRef, useEffect } from "react";

const DEFAULT_VIEWPORT_WIDTH = 1200;

const SvgBackground = () => {
	// scale rectangles relatively to viewport width / 1200
	const scaleCoefficient = useRef(1);

	useEffect(() => {
		// scale rectangles relatively to viewport width / 1200
		if (typeof document !== "undefined") {
			scaleCoefficient.current =
				document.documentElement.clientWidth / DEFAULT_VIEWPORT_WIDTH;
		}
	}, []);

	return (
		<div className={styles.svgWrapper}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="100%"
				height="100%"
				viewBox="0 0 100% 100%"
			>
				{/* white */}
				<SvgRectangle
					xOffset={0}
					yOffset={0}
					colorIndex={0}
					scaler={scaleCoefficient.current}
				/>
				<SvgRectangle
					xOffset={500}
					yOffset={0}
					colorIndex={1}
					scaler={scaleCoefficient.current}
				/>
				<SvgRectangle
					xOffset={0}
					yOffset={100}
					colorIndex={0}
					scaler={scaleCoefficient.current}
				/>
				<SvgRectangle
					xOffset={500}
					yOffset={100}
					colorIndex={1}
					scaler={scaleCoefficient.current}
				/>
				{/* yellow */}
				<SvgRectangle
					xOffset={0}
					yOffset={200}
					colorIndex={1}
					scaler={scaleCoefficient.current}
				/>
				<SvgRectangle
					xOffset={500}
					yOffset={200}
					colorIndex={1}
					scaler={scaleCoefficient.current}
				/>
				<SvgRectangle
					xOffset={0}
					yOffset={350}
					colorIndex={1}
					scaler={scaleCoefficient.current}
				/>
				<SvgRectangle
					xOffset={500}
					yOffset={350}
					colorIndex={1}
					scaler={scaleCoefficient.current}
				/>
				{/* violet */}
				<SvgRectangle
					xOffset={0}
					yOffset={450}
					colorIndex={3}
					scaler={scaleCoefficient.current}
				/>
				<SvgRectangle
					xOffset={500}
					yOffset={450}
					colorIndex={2}
					scaler={scaleCoefficient.current}
				/>
				<SvgRectangle
					xOffset={0}
					yOffset={600}
					colorIndex={3}
					scaler={scaleCoefficient.current}
				/>
				<SvgRectangle
					xOffset={500}
					yOffset={600}
					colorIndex={3}
					scaler={scaleCoefficient.current}
				/>
				{/* purple */}
				<SvgRectangle
					xOffset={0}
					yOffset={680}
					colorIndex={3}
					scaler={scaleCoefficient.current}
				/>
				<SvgRectangle
					xOffset={500}
					yOffset={680}
					colorIndex={2}
					scaler={scaleCoefficient.current}
				/>
				<SvgRectangle
					xOffset={0}
					yOffset={850}
					colorIndex={3}
					scaler={scaleCoefficient.current}
				/>
				<SvgRectangle
					xOffset={500}
					yOffset={850}
					colorIndex={3}
					scaler={scaleCoefficient.current}
				/>
			</svg>
		</div>
	);
};

export default SvgBackground;

// coords of rect for 1200 viewport width
const DEFAULT_COORDS = {
	width: 1652,
	height: 303,
};

interface SvgRectProps {
	xOffset: number;
	yOffset: number;
	colorIndex: number;
	// scale rect relatively to width of screen
	scaler: number;
}

const SvgRectangle = ({
	xOffset,
	yOffset,
	colorIndex,
	scaler,
}: SvgRectProps) => {
	// color
	const color = COLORS[colorIndex];
	const rotateX = Math.random() * 15;

	const relativeWidth = DEFAULT_COORDS.width * scaler;
	const relativeHeight = DEFAULT_COORDS.height * scaler;

	return (
		<rect
			x={xOffset}
			y={yOffset}
			width={relativeWidth}
			height={relativeHeight}
			fill={color}
			stroke={color}
			transform={`rotate(${rotateX} -15 0)`}
			rx="50"
		/>
	);
};
