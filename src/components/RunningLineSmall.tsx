import { RunningTextLine, RunningLineItemSmall } from "./shared/RunningTextLine";
import type { TupleNum2 } from "@/types/tuples";


const TEXT = 'Место для экспертизы и творчества';

// transformation values
// running line Options
const TRANSLATE_BORDERS: TupleNum2 = [-150, 150];
const TRANSLATE_STEP = 20;

const ROTATE_BORDERS: TupleNum2 = [5, -5];
const ROTATE_STEP = 0.8;

export const RunningLineSmall = () => {

    const renderingSpanItems = new Array(8).fill(0).map(() => {
        return <RunningLineItemSmall text={TEXT} />
    });

    return (
        <RunningTextLine 
            mode='small'
            transforms={{
                translateX: {
                    step: TRANSLATE_STEP,
                    borders: TRANSLATE_BORDERS,
                    direction: 'negToPos',
                },
                rotate: {
                    step: ROTATE_STEP,
                    borders: ROTATE_BORDERS,
                    direction: 'posToNeg',
                }
            }}
        >
            {renderingSpanItems}
        </RunningTextLine>
    )
};