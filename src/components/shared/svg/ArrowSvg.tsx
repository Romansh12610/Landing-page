
interface ArrowProps {
    width: number;
    height: number;
}

export const ArrowSvg = ({ width, height }: ArrowProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      transform="rotate(-5)"
    >
      <path
        stroke="#14161F"
        strokeWidth={3}
        d="m.874 12.403 31.878 2.79m0 0L20.516 1.072m12.236 14.12L18.25 26.972"
      />
    </svg>
  )