'use client';

import { ServiceSmallCard } from "@/components/shared/services/ServiceSmallCard";
import styles from "@/styles/modules/services/additionalContainer.module.scss";
import { transformElementOnScroll } from "@/utils/transformElementOnScroll";
import { useEffect, useRef } from "react";
import type { CardAnimationData } from "./ServicesCardContainer";
import { useScrollContext } from "@/hooks/useScrollContext";

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
    step: 55,
    borders: {
        translateBorders: [250, -170],
        scrollEnterBorders: [2350, 3000],
    },
    direction: 'bt',
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
    // context, for custom scroll value
    const scrollCurrentValueRef = useScrollContext();

	useEffect(() => {

        const handleCustomScroll = (e: WheelEvent) => {
			e.preventDefault();

			// accessing custom scroll value
			// in context 
			if (scrollCurrentValueRef && 
				scrollCurrentValueRef.currentScrollValue != null && 
				scrollCurrentValueRef.currentScrollValue.current != null) {

				const currentScroll = scrollCurrentValueRef.currentScrollValue.current ?? window.scrollY;

				const shouldTransform = currentScroll >= scrollStart && currentScroll <= scrollEnd; 
                                        
                if (shouldTransform) {
                    transformElementOnScroll(
                        e,
                        elementRef,
                        undefined,
                        {
                            step: TRANSFORMS_DATA.step,
                            borders: TRANSFORMS_DATA.borders.translateBorders,
                            direction: TRANSFORMS_DATA.direction,
                            currentValueRef: currentTranslateRef,
                        }
                    )
                }
            }
        };

        document.addEventListener('wheel', handleCustomScroll);

        return () => {
            document.removeEventListener('wheel', handleCustomScroll);
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