'use client';
import type { CardAnimationData } from "@/components/containers/services/ServicesCardContainer";
import styles from "@/styles/modules/services/card.module.scss";
import { nextWordNewLine } from "@/utils/textFormat/nextWorkNewLine";
import { useEffect, useRef } from "react";
import { transformElementOnScroll } from "@/utils/transformElementOnScroll";
import { useScrollContext } from "@/hooks/useScrollContext";


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


    // context, for custom scroll value
    const scrollCurrentValueRef = useScrollContext();

	useEffect(() => {

        const coords = elementDOMRef?.current?.getBoundingClientRect();
        // log
        console.log('Additional container starts at: ', coords?.top);

        const handleCustomScroll = (e: WheelEvent) => {
			e.preventDefault();

			// accessing custom scroll value
			// in context 
			if (scrollCurrentValueRef && 
				scrollCurrentValueRef.currentScrollValue != null && 
				scrollCurrentValueRef.currentScrollValue.current != null) {

				const currentScroll = scrollCurrentValueRef.currentScrollValue.current ?? window.scrollY;

				const shouldTransform = (e.deltaY > 0 && (currentScroll >= scrollStartBorder && currentScroll <= scrollEndBorder)) 
				|| (e.deltaY < 0 && (currentScroll <= scrollEndBorder && currentScroll >= scrollStartBorder));

                if (shouldTransform) {
                    transformElementOnScroll(
                        e,
                        elementDOMRef,
                        undefined,
                        {
                            currentValueRef: currentTranslateRef,
                            borders: [translateYStartBorder, translateYEndBorder],
                            step: transforms.step,
                            direction: transforms.direction,
                        }
                    )
                }
            }
        };


        document.addEventListener('wheel', handleCustomScroll);

        return () => document.removeEventListener('wheel', handleCustomScroll);

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
