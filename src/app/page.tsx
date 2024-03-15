import styles from "@/styles/modules/page.module.scss";
import dynamic from "next/dynamic";

import { Header } from "@/components/Header";
import { Cursor } from "@/components/Cursor";
import { LogoName } from "@/components/LogoName";
import { ScrollContainer } from "@/components/containers/ScrollContainer";
import { IntroWrapper } from "@/components/containers/IntroWrapper";
import { DescriptionBlock } from "@/components/containers/DescriptionBlock";
import { RunningLineSmall } from "@/components/RunningLineSmall";

const SvgBackground = dynamic(() => import('@/components/SvgBackground'), { ssr: false} );

export default function HomePage() {
	return (
		<>
			<Cursor />
			<Header />
			<ScrollContainer>
				<main className={styles.main}>
					<section className={styles.main__section_first}>
						<IntroWrapper>
							<SvgBackground />
							<LogoName />
						</IntroWrapper>
						<DescriptionBlock />
					</section>
					<RunningLineSmall />
				</main>
			</ScrollContainer>
		</>
	);
}
