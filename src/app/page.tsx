import { Header } from "@/components/Header";
import { Cursor } from "@/components/Cursor";

export default function HomePage() {
	return (
		<>
			<Cursor />
			<Header />
			<main>
				<div>
					<p>Hello next js</p>
				</div>
			</main>
		</>
	);
}
