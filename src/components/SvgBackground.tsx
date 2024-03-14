import styles from "@/styles/modules/svgRectangles.module.scss";


export const SvgBackground = () => {

    return (
        <div className={styles.svgWrapper}>
            <svg xmlns="http://www.w3.org/2000/svg"
                width="100%" height="100%"
                viewBox="0 0 100% 100%"
            >
                <SvgRectangle xOffset={0} yOffset={0} colorIndex={3} />
                <SvgRectangle xOffset={0} yOffset={200} colorIndex={3} />
                <SvgRectangle xOffset={0} yOffset={500} colorIndex={1} />
                <SvgRectangle xOffset={0} yOffset={700} colorIndex={1} />
                <SvgRectangle xOffset={0} yOffset={900} colorIndex={1} />
                <SvgRectangle xOffset={0} yOffset={900} colorIndex={0} />
                
                <SvgRectangle xOffset={0} yOffset={800} colorIndex={2} />
                <SvgRectangle xOffset={300} yOffset={0} colorIndex={0} />
                <SvgRectangle xOffset={150} yOffset={200} colorIndex={0} />
                <SvgRectangle xOffset={400} yOffset={500} colorIndex={0} />
                <SvgRectangle xOffset={500} yOffset={700} colorIndex={2} />
                <SvgRectangle xOffset={900} yOffset={900} colorIndex={2} />
            </svg>
        </div>
    )
};


// coords of rect for 1200 viewport width
const DEFAULT_COORDS = {
    width: 1652,
    height: 303,
};

// yellow / violet / purple / white colors
const COLORS = ['hsla(56, 100%, 67%, 0.8)', 'hsla(266, 77%, 88%, 0.8)', 'hsla(266, 100%, 73%, 0.8)', 'hsl(206, 47%, 90%, 0.8)'];

interface SvgRectProps {
    xOffset: number;
    yOffset: number;
    colorIndex: number;
}
const SvgRectangle = ({ xOffset, yOffset, colorIndex }: SvgRectProps) => {

    const x = Math.random() * xOffset; // random x start coord
    const y = Math.random() * yOffset; // random y start coord
    
    // color
    const color = COLORS[colorIndex];

    return (
        <rect x={x} y={y} width={DEFAULT_COORDS.width} height={DEFAULT_COORDS.height} fill={color} stroke={color} transform="rotate(-5)" rx="50" />
    )
};