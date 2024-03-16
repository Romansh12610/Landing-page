"use client";

import { LogotypeSvg } from "./shared/svg/LogotypeSvg";
import styles from "@/styles/modules/logoName.module.scss";
import { COLORS } from "@/misc/colors";
import { useEffect, useRef } from "react";
import { scrollElementTop } from "@/utils/scrollElementTop";
import { RunningTextLine, RunningLineItemHeader } from "./shared/RunningTextLine";
import type { TupleNum2 } from "@/types/tuples";

const BIG_LOGO_WIDTH = 1120;
const BIG_LOGO_HEIGHT = 260;

// how many scale Logo svg
const X_SVG_SCALER = BIG_LOGO_WIDTH / 103;
const Y_SVG_SCALER = BIG_LOGO_HEIGHT / 24;

// distance for 1 scroll in px
const SCROLL_STEP = 43;
// initial translateY value in px
const SCROLL_START = 400;
const SCROLL_END = 16;

// text for running line
const runningLineText = ['бизнеса', 'города', 'человека', 'бренда', 'идеи', 'будущего', 'роста', 'успеха', 'шага вперёд'];

// running line Options
const TRANSLATE_BORDERS: TupleNum2 = [300, -300];
const TRANSLATE_STEP = 50;

const ROTATE_BORDERS: TupleNum2 = [2, -6];
const ROTATE_STEP = 0.8;


export const LogoName = () => {
	const logoDOMRef = useRef<HTMLDivElement | null>(null);
	const CURRENT_SCROLL = useRef(SCROLL_START);

	useEffect(() => {
		const handleCustomScroll = (e: WheelEvent) => {
			e.preventDefault();
			// helperFunction
			scrollElementTop(
				e,
				logoDOMRef,
				CURRENT_SCROLL,
				SCROLL_STEP,
				SCROLL_START,
				SCROLL_END
			);
		};

		document.addEventListener("wheel", handleCustomScroll);

		return () => document.removeEventListener("wheel", handleCustomScroll);
	}, []);


    // content for running line
    const renderingLineItems = runningLineText.map(text => {
        return (
            <RunningLineItemHeader key={text} text={text} />
        )
    });


	return (
		<div className={styles.logo__wrapper} ref={logoDOMRef}>
			<h1 className={styles.logo__heading}>
				Агенство территориального брендинга
			</h1>
			<LogotypeSvg
				width={103}
				height={24}
				fill={COLORS[4]}
				scaleX={X_SVG_SCALER}
				scaleY={Y_SVG_SCALER}
				shouldScaleCursor={false}
			/>
            <div className={styles.logo__textLine_wrapper}>
                <RunningTextLine 
					mode='big'
					animationScrollBorders={[0, 9000]}
					transforms={{
						translateX: {
							step: TRANSLATE_STEP,
							borders: TRANSLATE_BORDERS,
							direction: 'negToPos'
						},
						rotate: {
							step: ROTATE_STEP,
							borders: ROTATE_BORDERS,
							direction: 'posToNeg',
						}
					}}
				>
                    {renderingLineItems}
                </RunningTextLine>
            </div>
		</div>
	);
};