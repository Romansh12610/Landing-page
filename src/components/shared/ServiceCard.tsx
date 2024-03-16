'use client';
import type { CardAnimationData } from "../containers/ServicesCardContainer";
import styles from "@/styles/modules/services/card.module.scss";
import { nextWordNewLine } from "@/utils/textFormat/nextWorkNewLine";
import { useEffect, useLayoutEffect, useRef } from "react";
import { transformElementOnScroll } from "@/utils/transformElementOnScroll";


interface ServiceCardProps {
    title: string;
    subtitle: string;
    description: string;
    options: string[];
    renderSvg: React.ReactNode;
    transforms: CardAnimationData;
}

export const ServiceCard = ({
	title,
    subtitle,
	renderSvg,
	description,
	options,
    transforms,
}: ServiceCardProps) => {
	// const rendering options
	const renderingOptions = options.map((optionText, ind) => (
		<li key={`${optionText}_${ind}`} className={styles.card__list_option}>
            <p>{optionText}</p>
        </li>
	));

	// want first word only on first line
	let titleTuple = nextWordNewLine(title);

	const titleWrapper = (
		<h3 className={styles.card__title}>
			{titleTuple[0]}
			<span className={styles.card__title_span}>{titleTuple[1]}</span>
		</h3>
	);

    // if has subtitle
    const hasSubtitle = subtitle.length > 0;

    // ANIMATIONS

    // borders descructuring
    const [scrollStartBorder, scrollEndBorder] = transforms.borders.scrollEnterBorders;
    const [translateYStartBorder, translateYEndBorder] = transforms.borders.translateBorders;

    // refs DOM
    const elementDOMRef = useRef<HTMLDivElement | null>(null);
    const currentTranslateRef = useRef(translateYStartBorder);

    /* useLayoutEffect(() => {
        if (currentTranslateRef.current != null) {
            currentTranslateRef.current = translateYStartBorder;
        }
    }, []); */


    // TRANSFORMATIONS on scroll
    useEffect(() => {
        
        const handleScrollTransform = (e: WheelEvent) => {
            if (elementDOMRef.current != null && typeof window !== 'undefined') {

                const shoudTransform = (
                            e.deltaY > 0 && window.scrollY >= scrollStartBorder 
                            || e.deltaY < 0 && window.scrollY <= scrollEndBorder
                );

                if (shoudTransform) {
                    transformElementOnScroll(
                        e,
                        elementDOMRef,
                        undefined,
                        {
                            currentValueRef: currentTranslateRef,
                            borders: [translateYStartBorder, translateYEndBorder],
                            step: transforms.step,
                            fromPositiveToNegative: transforms.fromPositiveToNegative,
                        }
                    )
                }
            }
        };


        document.addEventListener('wheel', handleScrollTransform);

        return () => document.removeEventListener('wheel', handleScrollTransform);

    }, []);


	return (
		<div className={styles.card__wrapper} 
            data-cursor-scaler={true}
            data-has-subtitle={hasSubtitle}
            ref={elementDOMRef}
        >
			<div className={styles.card__titleSvg_wrapper}>
				{titleWrapper}
				{renderSvg}
			</div>

            {/* subtitle, if presented */}
            {hasSubtitle && (
                <p className={styles.card__subtitle}>{subtitle}</p>
            )}

            {/* description */}
			<p className={styles.card__description}
                data-has-subtitle={hasSubtitle}
            >{description}</p>

			{/* List of options */}
			<ul className={styles.card__option_list}>
                <div className={styles.card__hider_list}>
                    <div className={styles.card__hider_ellipsis}>
                        <span>...</span>
                    </div>
                </div>
                {renderingOptions}
            </ul>
		</div>
	);
};
