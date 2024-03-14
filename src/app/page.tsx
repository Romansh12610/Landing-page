import styles from "@/styles/modules/page.module.scss";

import { Header } from "@/components/Header";
import { Cursor } from "@/components/Cursor";
import { SvgBackground } from "@/components/SvgBackground";
import { LogoName } from "@/components/LogoName";

export default function HomePage() {
	return (
		<>
			<Cursor />
			<Header />
			<main className={styles.main}>
				<SvgBackground />
				<LogoName />
			</main>
		</>
	);
}
