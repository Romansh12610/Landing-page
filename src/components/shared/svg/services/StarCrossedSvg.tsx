import type { SvgSizeType } from "@/components/containers/services/ServicesAdditionalContainer"

interface SvgProps {
    size: SvgSizeType;
}

const SVG_SIZES = {
    small: 16,
    big: 24,
    proportion: 16 / 24,
}

export const StarCrossedSvg = ({ size }: SvgProps) => {

    let scalerX = 1;
    let scalerY = 1;

    if (size === 'small') {
        scalerX = SVG_SIZES.proportion;
        scalerY = SVG_SIZES.proportion;
    }

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 ${size} ${size}`}
            width={SVG_SIZES.big}
            height={SVG_SIZES.big}
            transform={`scale(${scalerX} ${scalerY})`}
        >
            <path
                d="m12 0 2.715 9.285L24 12l-9.285 2.715L12 24l-2.715-9.285L0 12l9.285-2.715L12 0Z"
            />
        </svg>
    )
}