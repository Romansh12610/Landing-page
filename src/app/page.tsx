import styles from "@/styles/modules/page.module.scss";
import dynamic from "next/dynamic";

import { Cursor } from "@/components/Cursor";
import { ScrollContainer } from "@/components/containers/ScrollContainer";
import { IntroWrapper } from "@/components/containers/IntroWrapper";
import { DescriptionBlock } from "@/components/containers/DescriptionBlock";
import { RunningLineSmall } from "@/components/RunningLineSmall";
import { TupleNum2 } from "@/types/tuples";
import { ServicesSection } from "@/components/containers/services/ServicesSection";
import { ButtonWrapper } from "@/components/containers/ButtonWrapper";
import { Footer } from "@/components/Footer";
import { BackdropContextWrapper } from "@/components/containers/BackdropContextWrapper";

const Header = dynamic(() => import("@/components/Header"), {
	ssr: false,
});
const SvgBackground = dynamic(() => import("@/components/SvgBackground"), {
	ssr: false,
});
const LogoName = dynamic(() => import("@/components/LogoName"), {
	ssr: false,
});

// middle running line
// [scrollStart, scrollEnd] - to decide apply animations or not
const RUNNING_LINE_1_ANIMATION_BORDERS: TupleNum2 = [600, 2300];

export default function HomePage() {
	return (
		<>
			<Cursor />
			<BackdropContextWrapper>
				<Header />
				<ScrollContainer>
					<main className={styles.main}>

						<section className={styles.main__section_intro_screen}>
							<IntroWrapper>
								<SvgBackground />
								<LogoName />
							</IntroWrapper>
							<DescriptionBlock />
						</section>

						<div className={styles.main__running_line_wrapper_middle}>
							<RunningLineSmall
								animationScrollBorders={RUNNING_LINE_1_ANIMATION_BORDERS}
							/>
						</div>

						<ServicesSection />
						<ButtonWrapper />

					</main>
					<Footer />
				</ScrollContainer>
			</BackdropContextWrapper>
		</>
	);
}
