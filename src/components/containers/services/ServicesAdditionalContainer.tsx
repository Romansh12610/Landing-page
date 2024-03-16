'use client';

import { ServiceSmallCard } from "@/components/shared/services/ServiceSmallCard";
import styles from "@/styles/modules/services/additionalContainer.module.scss";
import { transformElementOnScroll } from "@/utils/transformElementOnScroll";
import { useEffect, useRef } from "react";
import type { CardAnimationData } from "./ServicesCardContainer";

// text data
interface CardTextData {
    title: string;
    description: string;
}

const CARD_TEXT_DATA: CardTextData[] = [
    {
        title: 'Разработка сайта / приложения',
        description: 'Когда пришла пора действовать, но не хватает самого главного',
    },
    {
        title: 'Обучение',
        description: 'Когда ваша цель - лично во всем разобраться и стать экспертом',
    },
    {
        title: 'Консультации',
        description: 'Когда хочется сделать своими руками, но остались важные вопросы',
    }
];


// transformation props
const TRANSFORMS_DATA: CardAnimationData = {
    step: 25,
    borders: {
        translateBorders: [200, 0],
        scrollEnterBorders: [1500, 2700],
    },
    fromPositiveToNegative: true,
}


export const ServicesAdditionalContainer = () => {

    const renderingCards = CARD_TEXT_DATA.map(textData => {
        return (
            <li key={textData.title}>
                <ServiceSmallCard 
                    title={textData.title}
                    description={textData.description}
                />
            </li>
        )
    });  

    // scroll transform animation
    // borders
    const [translateStart] = TRANSFORMS_DATA.borders.translateBorders; 
    const [scrollStart, scrollEnd] = TRANSFORMS_DATA.borders.scrollEnterBorders; 

    // refs
    const elementRef = useRef<HTMLUListElement | null>(null);
    const currentTranslateRef = useRef(translateStart);

    useEffect(() => {
        
        const handleTransformOnScroll = (e: WheelEvent) => {
            if (elementRef.current != null) {
                const shouldTransform = e.deltaY > 0 && window.scrollY >= scrollStart
                                        || e.deltaY < 0 && window.scrollY <= scrollEnd;
                                        
                if (shouldTransform) {
                    transformElementOnScroll(
                        e,
                        elementRef,
                        undefined,
                        {
                            step: TRANSFORMS_DATA.step,
                            borders: TRANSFORMS_DATA.borders.translateBorders,
                            fromPositiveToNegative: TRANSFORMS_DATA.fromPositiveToNegative,
                            currentValueRef: currentTranslateRef,
                        }
                    )
                }
            }
        };

        document.addEventListener('wheel', handleTransformOnScroll);

        return () => {
            document.removeEventListener('wheel', handleTransformOnScroll);
        }

    }, []);


    return (
        <ul className={styles.services__add_container}
            ref={elementRef}
        >
            {renderingCards}
        </ul>
    )
};