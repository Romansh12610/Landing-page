import { TabWithUnderline } from "../shared/TabWithUndeline";
import styles from "@/styles/modules/services/introBlock.module.scss";
import type { CardModeType } from "./ServicesSection";

interface IntroBlockProps {
	servicesMode: CardModeType;
	setServicesToBusiness: () => void;
	setServicesToTerritory: () => void;
}

export const ServicesIntroBlock = ({
	servicesMode,
	setServicesToBusiness,
	setServicesToTerritory,
}: IntroBlockProps) => {

	return (
		<div className={styles.services__wrapper}>
			<h2>Услуги</h2>
			<div className={styles.services__tabs_wrapper}>
				<TabWithUnderline
					text="Для бизнеса"
					isSelected={servicesMode === 'business'}
					onClick={setServicesToBusiness}
				/>
				<TabWithUnderline
					text="Для территории"
					isSelected={servicesMode === 'territory'}
					onClick={setServicesToTerritory}
				/>
			</div>
		</div>
	);
};
