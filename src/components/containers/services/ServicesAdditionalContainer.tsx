'use client';

import { ServiceSmallCard } from "@/components/shared/services/ServiceSmallCard";
import styles from "@/styles/modules/services/additionalContainer.module.scss";
import { transformElementOnScroll } from "@/utils/transformElementOnScroll";
import { useEffect, useRef, useState } from "react";
import type { CardAnimationData } from "./ServicesCardContainer";
import { useScrollContext } from "@/hooks/useScrollContext";
import { TimerType } from "@/types/timerType";

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
    step: 43,
    borders: {
        translateBorders: [350, 110],
        scrollEnterBorders: [2150, 3000],
    },
    direction: 'bt',
}


const SVG_SIZES = {
    small: 16,
    big: 24,
    breakPoint: 1199,
}

export type SvgSizeType = 'small' | 'big';

export const ServicesAdditionalContainer = () => {
    
    // size of the svg manipulation
    // if < 1200 small, else big
    const [svgSizeMode, setSvgSizeMode] = useState<SvgSizeType>('small');
    const resizeTimerRef = useRef<TimerType | null>(null);
    
    useEffect(() => {
        
        const handleSvgSize = () => {
            if (resizeTimerRef != null && typeof document !== 'undefined') {
                if (resizeTimerRef.current) {
                    clearTimeout(resizeTimerRef.current);
                    resizeTimerRef.current = null;
                }
                
                resizeTimerRef.current = setTimeout(() => {
                    const currentVPWidth = document.documentElement.clientWidth;

                    // small
                    if (currentVPWidth < SVG_SIZES.breakPoint) {
                        setSvgSizeMode('small');
                    }

                    else {
                        setSvgSizeMode('big');
                    }

                }, 100);
            }
        };


        window.addEventListener('resize', handleSvgSize);

        return () => window.removeEventListener('resize', handleSvgSize);

    }, []);

    const renderingCards = CARD_TEXT_DATA.map(textData => {
        return (
            <li key={textData.title}>
                <ServiceSmallCard 
                    title={textData.title}
                    description={textData.description}
                    svgSize={svgSizeMode}
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
    const scrollContext = useScrollContext();

	useEffect(() => {

        const handleCustomScroll = (e: WheelEvent) => {
			e.preventDefault();

			// accessing custom scroll value
			// in context 
			if (scrollContext && 
				scrollContext.currentScrollValue != null && 
				scrollContext.currentScrollValue.current != null) {

                // viewport < 1200 --> cant scroll children 
                const { canScrollChildren } = scrollContext;
                if (!canScrollChildren) return;

				const currentScroll = scrollContext.currentScrollValue.current ?? window.scrollY;

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

    }, [scrollContext]);


    return (
        <ul className={styles.services__add_container}
            ref={elementRef}
        >
            {renderingCards}
        </ul>
    )
};