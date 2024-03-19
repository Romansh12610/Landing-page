import { COLORS } from "@/misc/colors";
import styles from "@/styles/modules/svgRectangle.module.scss";

export type RectAnimationType = 'motion-top-left' | 'motion-top-right' | 'motion-bottom-left' | 'motion-bottom-right' | 'appearing';

export const RECT_ANIMATIONS: RectAnimationType[] = ['motion-top-left', 'motion-top-right', 'motion-bottom-left', 'motion-bottom-right', 'appearing'];

interface SvgRectProps {
	xOffset: number;
	yOffset: number;
	colorIndex: number;
	// scale rect relatively to width of screen
	width: number;
	height: number;
    animationType: RectAnimationType;
}

const SvgRectangle = ({
	xOffset,
	yOffset,
	colorIndex,
	width,
	height,
    animationType,
}: SvgRectProps) => {
	// color
	const color = COLORS[colorIndex];
    const rotateX = Math.random() * 40;
	const rotateY = Math.random() * 40;
	const rotateZ = Math.random() * 40;

	return (
		<rect
            className={styles.rect_svg}
			x={xOffset}
			y={yOffset}
			width={width}
			height={height}
			fill={color}
			stroke={color}
			transform={`rotate(${rotateX} ${rotateY} ${rotateZ})`}
			rx="150"
            data-animation={animationType}
		/>
	);
};

export default SvgRectangle;