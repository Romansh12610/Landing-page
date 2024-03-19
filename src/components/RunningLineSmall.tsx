import { RunningTextLine, RunningLineItemSmall } from "./shared/RunningTextLine";
import type { TupleNum2 } from "@/types/tuples";


const TEXT = 'Место для экспертизы и творчества';

// transformation values
// running line Options
const TRANSLATE_BORDERS: TupleNum2 = [-500, 500];
const TRANSLATE_STEP = 55;

const ROTATE_BORDERS: TupleNum2 = [6, -6];
const ROTATE_STEP = 1.2;

interface RunningLineSmallProps {
    // where to start / end animations
    animationScrollBorders: TupleNum2;
}

export const RunningLineSmall = ({ animationScrollBorders }: RunningLineSmallProps) => {

    const renderingSpanItems = new Array(8).fill(0).map((_, ind) => {
        return <RunningLineItemSmall key={`${ind * 3}`} text={TEXT} />
    });

    return (
        <RunningTextLine 
            mode='small'
            animationScrollBorders={animationScrollBorders}
            transforms={{
                translateX: {
                    step: TRANSLATE_STEP,
                    borders: TRANSLATE_BORDERS,
                },
                translateY: {
                    step: 0,
                    borders: [0, 0],
                },
                rotate: {
                    step: ROTATE_STEP,
                    borders: ROTATE_BORDERS,
                }
            }}
        >
            {renderingSpanItems}
        </RunningTextLine>
    )
};