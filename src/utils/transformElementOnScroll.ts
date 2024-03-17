
export type HorizontalDirection = 'ltr' | 'rtl';
export type VerticalDirection = 'tb' | 'bt';
export type RotateDirection = 'clockWise' | 'counterClockwise';

export type DirectionType = HorizontalDirection | VerticalDirection | RotateDirection

type GeneralPropertyDescription = {
    step: number,
    currentValueRef: React.MutableRefObject<number>,
    borders: [number, number],
};

// translateX 
export type PropertyDescriptionTX = GeneralPropertyDescription & { 
    direction: HorizontalDirection 
};

// translateY
export type PropertyDescriptionTY = GeneralPropertyDescription & {
    direction: VerticalDirection; 
};

// rotate
export type PropertyDescriptionR = GeneralPropertyDescription & {
    direction: RotateDirection; 
};


/**
 * @description this is complex function for applying multiple transforms on element
 * @param translateX - this is description of translateX transforms on element
 * @param translateY - this is description of translateY transforms on element
 * @param rotate - this is description of rotate transforms on element
 */
export const transformElementOnScroll = (
    e: WheelEvent,
    elementDomRef: React.RefObject<HTMLElement>,
    translateX?: PropertyDescriptionTX,
    translateY?: PropertyDescriptionTY,
    rotate?: PropertyDescriptionR,
) => {
    
    if (elementDomRef.current == null) return;

    // storing all transformations 
    let transformations: TransformationProps = [];

    // scroll bottom
    if (e.deltaY > 0) {
        // translateX
        // from pos to neg = ++
        // from neg to pos = --
        if (translateX) {
            // direction means with scroll from top to bottom perform animation
            // on this direction
            // with scroll from bottom to top --> invert transformation
            const { currentValueRef, step, borders, direction } = translateX;

            if (currentValueRef.current == null) return;

            // make absolute value to compare to STEP, which is always POSITIVE
            const remainTranslateX = Math.abs(currentValueRef.current - borders[1]);

            if (step <= remainTranslateX) {
                // - to +
                if (direction === 'ltr') {
                    currentValueRef.current += step;
                }
                // + to -
                else {
                    currentValueRef.current -= step;
                }
            }

            // step > remain --> translate to END
            else {
                // - to +
                if (direction === 'ltr') {
                    currentValueRef.current += remainTranslateX;
                }
                // + to -
                else {
                    currentValueRef.current -= remainTranslateX;
                }
            }

            transformations.push({
                property: 'translateX',
                value: currentValueRef.current,
            });
        }
        
        // translateY
        // from pos to neg = ++
        // from neg to pos = --
        if (translateY) {
            const { currentValueRef, step, borders, direction } = translateY;

            if (currentValueRef.current == null) return;

            const remainTranslateY = Math.abs(currentValueRef.current - borders[1]);
            
            if (step <= remainTranslateY) {
                // top -> bottom === - / +
                if (direction === 'tb') {
                    currentValueRef.current += step;
                }
                // + to -
                else {
                    currentValueRef.current -= step;
                }
            }

             // step > remain --> translate to END
             else {
                // - / +  default 
                if (direction === 'tb') {
                    currentValueRef.current += remainTranslateY;
                }
                // + to -
                else {
                    currentValueRef.current -= remainTranslateY;
                }
            }

            transformations.push({
                property: 'translateY',
                value: currentValueRef.current,
            });
        }
        // rotate
        if (rotate) {
            const { currentValueRef, step, borders, direction } = rotate;
            if (currentValueRef.current == null) return;

            const remainRotate = Math.abs(currentValueRef.current - borders[1]);
            
            if (step <= remainRotate) {
                // - / +  default
                // counterClockwise === - > +
                if (direction === 'counterClockwise') {
                    currentValueRef.current += step;
                }
                else {
                    currentValueRef.current -= step;
                }
            }

             // step > remain --> translate to END
             else {
                // counterClockwise === - > +
                if (direction === 'counterClockwise') {
                    currentValueRef.current += remainRotate;
                }
                else {
                    currentValueRef.current -= remainRotate;
                }
            }

            transformations.push({
                property: 'rotate',
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
            const { currentValueRef, step, borders, direction } = translateX;
            if (currentValueRef.current == null) return;

            const remainTranslateX = Math.abs(currentValueRef.current - borders[0]);
            
            if (step <= remainTranslateX) {
                // + to -
                if (direction === 'ltr') {
                    currentValueRef.current -= step;
                }
                // - to +
                else {
                    currentValueRef.current += step;
                }
            }

            // step > remain --> translate to END
            else {
                // + to -
                if (direction === 'ltr') {
                    currentValueRef.current -= remainTranslateX;
                }
                // - to +
                else {
                    currentValueRef.current += remainTranslateX;
                }
            }

            transformations.push({
                property: 'translateX',
                value: currentValueRef.current,
            });
        }
        // translateY
        if (translateY) {
            const { currentValueRef, step, borders, direction } = translateY;
            if (currentValueRef.current == null) return;

            const remainTranslateY = Math.abs(currentValueRef.current - borders[0]);
                
            if (step <= remainTranslateY) {
                // + to -
                if (direction === 'tb') {
                    currentValueRef.current -= step;
                }
                // - to +
                else {
                    currentValueRef.current += step;
                }
            }

             // step > remain --> translate to END
             else {
                // - / +  default 
                if (direction === 'tb') {
                    currentValueRef.current -= remainTranslateY;
                }
                // + to -
                else {
                    currentValueRef.current += remainTranslateY;
                }
            }

            transformations.push({
                property: 'translateY',
                value: currentValueRef.current,
            });
        }
        // rotate
        if (rotate) {
            const { currentValueRef, step, borders, direction } = rotate;
            if (currentValueRef.current == null) return;

            let remainRotate = Math.abs(currentValueRef.current - borders[0]);
            
            if (step <= remainRotate) {
                // + / -
                if (direction === 'counterClockwise') {
                    currentValueRef.current -= step;
                }
                else {
                    currentValueRef.current += step;
                }
            }

             // step > remain --> translate to END
             else {
                if (direction === 'counterClockwise') {
                    currentValueRef.current -= remainRotate;
                }
                else {
                    currentValueRef.current += remainRotate;
                }
            }

            transformations.push({
                property: 'rotate',
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

        /* console.log('RESULT transforms: ', transformationResultString); */

        elementRef.current.style.transform = transformationResultString;
    });
};