'use client';

import styles from "@/styles/modules/services/servicesCardContainer.module.scss";
import { ServiceCard } from "@/components/shared/services/ServiceCard";
import { TwoEllipsesSvg } from "@/components/shared/svg/services/TwoEllipsesLineSvg"; 
import { RotatedLinesSvg } from "@/components/shared/svg/services/RotatedLinesSvg"; 
import { CircleWithLineSvg } from "@/components/shared/svg/services/CircleWithLineSvg"; 
import type { CardModeType } from "./ServicesSection";
import type { PropertyDescription } from "@/utils/transformElementOnScroll";
import { TupleNum2 } from "@/types/tuples";
import { LazyMotion, domAnimation, m,  } from "framer-motion";
import type { Variants } from "framer-motion";
import type { ContainerAnimation } from "./ServicesSection";

// animation varints
const containerVariants: Variants = {
    enter: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
            ease: 'easeInOut',
        }
    },
    exit: {
        opacity: 0,
        y: 200,
        transition: {
            duration: 1,
            ease: 'easeInOut',
        }
    }
};

export type CardAnimationData = Omit<PropertyDescription, 'currentValueRef' | 'borders'> & {
    borders: {
        translateBorders: TupleNum2;
        scrollEnterBorders: TupleNum2;
    }
};

// SCROLL card animation data
// index 0 - first card data, 1 - second, ...
const CARD_ANIMATION_DATA: CardAnimationData[] = [
    {
        step: 15,
        fromPositiveToNegative: false,
        borders: {
            translateBorders: [-15, 100],
            scrollEnterBorders: [1000, 3000],
        },
    },
    {
        step: 30,
        fromPositiveToNegative: true,
        borders: {
            translateBorders: [500, 100],
            scrollEnterBorders: [1000, 3000],
        },
    },
    {
        step: 15,
        fromPositiveToNegative: false,
        borders: {
            translateBorders: [15, 100],
            scrollEnterBorders: [1000, 3000],
        },
    },
];

// TEXT data
interface CardTextData {
	title: string;
    subtitle: string;
	description: string;
	options: string[];
	renderSvg: React.ReactNode;
    transforms: CardAnimationData;
}


const CARD_TEXT_DATA: {
    business: CardTextData[],
    territory: CardTextData[],
} = {
    business: [
        {
            title: "Исследования и анализ",
            subtitle: 'Хорошее начало.',
            description:
                "Комплексное погружение в контекст бизнеса, формирование цели и определение ключевых задач проекта",
            options: [
                "Культорологический анализ",
                "Анализ медиасреды и имиджа",
                "Анализ точек притяжения",
                "Анализ стейкхолдеров",
                "Коммуникационный аудит",
                "Социологическое исследование",
            ],
            renderSvg: <TwoEllipsesSvg />,
            transforms: CARD_ANIMATION_DATA[0],
        },
        {
            title: "Брендинг и айдентика",
            subtitle: 'Единственно верный ход.',
            description:
                "Когда нужно отразить уникальный характер компании, ее ценности и  преимущества - все в запоминающихся образах для коммуникации с аудиторией",
            options: [
                "Позиционирование",
                "Характер и ценности бренда",
                "Легенда места",
                "Нейминг / слоган",
                "Логотип и фирменный стиль",
                "Брендбук",
            ],
            renderSvg: <RotatedLinesSvg />,
            transforms: CARD_ANIMATION_DATA[1],
        },
        {
            title: "Стратегия и продвижение",
            subtitle: 'Правильное решение для роста.',
            description:
                "Когда пора заявить о себе и продумать все до мелочей: от стратегической цели до креативных постов в социальных сетях и публикаций в СМИ",
            options: [
                "Модель управления брендом",
                "Постановка целей",
                "Коммуникационная стратегия",
                "Копирайтинг",
                "Дизайн",
                "Медиа-план",
                "Контент-план",
            ],
            renderSvg: <CircleWithLineSvg />,
            transforms: CARD_ANIMATION_DATA[2],
        },
    ],

    territory: [
        {
            title: "Исследования и анализ",
            subtitle: '',
            description:
                "Комплексное погружение в контекст бизнеса, формирование цели и определение ключевых задач проекта",
            options: [
                "Культорологический анализ",
                "Анализ медиасреды и имиджа",
                "Анализ точек притяжения",
                "Анализ стейкхолдеров",
                "Коммуникационный аудит",
                "Социологическое исследование",
            ],
            renderSvg: <TwoEllipsesSvg />,
            transforms: CARD_ANIMATION_DATA[0],
        },
        {
            title: "Брендинг и айдентика",
            subtitle: '',
            description:
                "Когда нужно отразить уникальный характер компании, ее ценности и  преимущества - все в запоминающихся образах для коммуникации с аудиторией",
            options: [
                "Позиционирование",
                "Характер и ценности бренда",
                "Легенда места",
                "Нейминг / слоган",
                "Логотип и фирменный стиль",
                "Брендбук",
            ],
            renderSvg: <RotatedLinesSvg />,
            transforms: CARD_ANIMATION_DATA[1],
        },
        {
            title: "Стратегия и продвижение",
            subtitle: '',
            description:
                "Когда пора заявить о себе и продумать все до мелочей: от стратегической цели до креативных постов в социальных сетях и публикаций в СМИ",
            options: [
                "Модель управления брендом",
                "Постановка целей",
                "Коммуникационная стратегия",
                "Копирайтинг",
                "Дизайн",
                "Медиа-план",
                "Контент-план",
            ],
            renderSvg: <CircleWithLineSvg />,
            transforms: CARD_ANIMATION_DATA[2],
        },
    ]
};

interface CardContainerProps {
    servicesMode: CardModeType;
    animationState: ContainerAnimation;
}

export const ServicesCardContainer = ({ servicesMode, animationState }: CardContainerProps) => {
	// big-cards
	const renderingCards = CARD_TEXT_DATA[servicesMode].map(
		({ title, subtitle, description, options, renderSvg, transforms }) => {
			return (
				<ServiceCard
                    key={title}
					title={title}
                    subtitle={subtitle}
					description={description}
					options={options}
					renderSvg={renderSvg}
                    transforms={transforms}
				/>
			);
		}
	);

	// mini-cards
	// const renderingOptions

	return (
        <LazyMotion features={domAnimation}>
            <m.div className={styles.services__card_container}
                variants={containerVariants}
                animate={animationState}
            >
                {renderingCards}
            </m.div>
        </LazyMotion>
    );
};
