
export type PropertyDescription = {
    step: number,
    currentValueRef: React.MutableRefObject<number>,
    borders: [number, number],
    fromPositiveToNegative: boolean; 
};

/**
 * @description this is complex function for applying multiple transforms on element
 */
export const transformElementOnScroll = (
    e: WheelEvent,
    elementDomRef: React.RefObject<HTMLElement>,
    translateX?: PropertyDescription,
    translateY?: PropertyDescription,
    rotate?: PropertyDescription,
    scale?: PropertyDescription,
) => {
    
    if (elementDomRef.current == null) return;

    // storing all transformations 
    let transformations: TransformationProps = [];

    // scroll bottom
    // decrease values
    if (e.deltaY > 0) {
        // translateX
        if (translateX) {
            const { currentValueRef, step, borders, fromPositiveToNegative } = translateX;
            if (currentValueRef.current == null) return;

            let remainTranslateX = Math.abs(currentValueRef.current - borders[1]);
            
            if (step <= remainTranslateX) {
                // change current value
                // - / +  default
                currentValueRef.current = fromPositiveToNegative 
                                        ? currentValueRef.current - step
                                        : currentValueRef.current + step;
                
            }

            // step > remain --> translate to END
            else {
                currentValueRef.current = fromPositiveToNegative 
                                        ? currentValueRef.current - remainTranslateX
                                        : currentValueRef.current + remainTranslateX;
            }

            transformations.push({
                property: 'translateX',
                value: currentValueRef.current,
            });
        }
        // translateY
        if (translateY) {
            const { currentValueRef, step, borders, fromPositiveToNegative } = translateY;
            if (currentValueRef.current == null) return;

            let remainTranslateY = Math.abs(currentValueRef.current - borders[1]);
            
            if (step <= remainTranslateY) {
                // change current value
                // - / +  default
                currentValueRef.current = fromPositiveToNegative 
                                        ? currentValueRef.current - step
                                        : currentValueRef.current + step;  

            }

             // step > remain --> translate to END
             else {
                currentValueRef.current = fromPositiveToNegative 
                                        ? currentValueRef.current - remainTranslateY
                                        : currentValueRef.current + remainTranslateY;
            }

            transformations.push({
                property: 'translateY',
                value: currentValueRef.current,
            });
        }
        // rotate
        if (rotate) {
            const { currentValueRef, step, borders, fromPositiveToNegative } = rotate;
            if (currentValueRef.current == null) return;

            let remainRotate = Math.abs(currentValueRef.current - borders[1]);
            
            if (step <= remainRotate) {
                // change current value
                // - / +  default
                currentValueRef.current = fromPositiveToNegative 
                                        ? currentValueRef.current - step
                                        : currentValueRef.current + step;
                
            }

             // step > remain --> translate to END
             else {
                currentValueRef.current = fromPositiveToNegative 
                                        ? currentValueRef.current - remainRotate
                                        : currentValueRef.current + remainRotate;
            }

            transformations.push({
                property: 'rotate',
                value: currentValueRef.current,
            });
        }
        // scale
        if (scale) {
            const { currentValueRef, step, borders, fromPositiveToNegative } = scale;
            if (currentValueRef.current == null) return;

            let remainScale = Math.abs(currentValueRef.current - borders[1]);
            
            if (step <= remainScale) {
                // change current value
                // - / +  default
                currentValueRef.current = fromPositiveToNegative 
                                        ? currentValueRef.current - step
                                        : currentValueRef.current + step;
                
            }

            // step > remain --> scale to END
            else {
                currentValueRef.current = fromPositiveToNegative 
                                        ? currentValueRef.current - remainScale
                                        : currentValueRef.current + remainScale;
            }

            transformations.push({
                property: 'scale',
                value: currentValueRef.current,
            });
        }


        // request animations
        requestFrameHelper(elementDomRef, transformations);
    }
    
    // scroll top
    // increase values
    else {
        // translateX
        if (translateX) {
            const { currentValueRef, step, borders, fromPositiveToNegative } = translateX;
            if (currentValueRef.current == null) return;

            let remainTranslateX = Math.abs(currentValueRef.current - borders[0]);
            
            if (step <= remainTranslateX) {
                // change current value
                // + / -  default
                currentValueRef.current = fromPositiveToNegative 
                                        ? currentValueRef.current + step
                                        : currentValueRef.current - step;
            }

            else {
                currentValueRef.current = fromPositiveToNegative 
                                        ? currentValueRef.current + remainTranslateX
                                        : currentValueRef.current - remainTranslateX;
            }

            transformations.push({
                property: 'translateX',
                value: currentValueRef.current,
            });
        }
        // translateY
        if (translateY) {
            const { currentValueRef, step, borders, fromPositiveToNegative } = translateY;
            if (currentValueRef.current == null) return;

            let remainTranslateY = Math.abs(currentValueRef.current - borders[0]);
                

            if (step <= remainTranslateY) {
                // change current value
                // + / -  default
                currentValueRef.current = fromPositiveToNegative 
                                        ? currentValueRef.current + step
                                        : currentValueRef.current - step;
            }

            else {
                currentValueRef.current = fromPositiveToNegative 
                                        ? currentValueRef.current + remainTranslateY
                                        : currentValueRef.current - remainTranslateY;
            }

            transformations.push({
                property: 'translateY',
                value: currentValueRef.current,
            });
        }
        // rotate
        if (rotate) {
            const { currentValueRef, step, borders, fromPositiveToNegative } = rotate;
            if (currentValueRef.current == null) return;

            let remainRotate = Math.abs(currentValueRef.current - borders[0]);
            
            if (step <= remainRotate) {
                // change current value
                // + / -  default
                currentValueRef.current = fromPositiveToNegative 
                                        ? currentValueRef.current + step
                                        : currentValueRef.current - step;
                
            }

            else {
                currentValueRef.current = fromPositiveToNegative 
                                        ? currentValueRef.current + remainRotate
                                        : currentValueRef.current - remainRotate;
            }

            transformations.push({
                property: 'rotate',
                value: currentValueRef.current,
            });
        }
        // scale
        if (scale) {
            const { currentValueRef, step, borders, fromPositiveToNegative } = scale;
            if (currentValueRef.current == null) return;

            let remainScale = Math.abs(currentValueRef.current - borders[0]);
            
            if (step <= remainScale) {
                // change current value
                // + / -  default
                currentValueRef.current = fromPositiveToNegative 
                                        ? currentValueRef.current + step
                                        : currentValueRef.current - step;
            }

            else {
                currentValueRef.current = fromPositiveToNegative 
                                        ? currentValueRef.current + remainScale
                                        : currentValueRef.current - remainScale;
            }

            transformations.push({
                property: 'scale',
                value: currentValueRef.current,
            });
        }

        // request animations
        requestFrameHelper(elementDomRef, transformations);
    }
}


// helper function
export type AnimationProperties = 'translateX' | 'translateY' | 'rotate' | 'scale';

type TransformationProps = { 
    property: AnimationProperties;
    value: number; 
}[];

// units for different transformations
const UNITS = {
    rotate: 'deg',
    translateX: 'px',
    translateY: 'px',
    scale: '',
}

export const requestFrameHelper = (
    elementRef: React.RefObject<HTMLElement>,
    transformationProps: TransformationProps,
    ) => {
    
    let transformationResultString = ``;

    // concatenate all transformations
    transformationProps.forEach(transformation => {
        const unit = UNITS[transformation.property];
                    
        transformationResultString += `${transformation.property}(${transformation.value.toFixed(1)}${unit}) `;
    });

    requestAnimationFrame(() => {
        if (elementRef.current == null) return;
        elementRef.current.style.transform = transformationResultString;
    });
};