'use client';
import styles from "@/styles/modules/page.module.scss";
import { ServicesIntroBlock } from "./ServicesIntroBlock";
import { ServicesCardContainer } from "./ServicesCardContainer";
import { useEffect, useState } from "react";
import { ServicesAdditionalContainer } from "./ServicesAdditionalContainer";

export type CardModeType = 'business' | 'territory';
export type ContainerAnimation = 'enter' | 'exit';

export const ServicesSection = () => {

    const [servicesMode, setServicesMode] = useState<CardModeType>('business');

    // animation state
    const [containerAnimationState, setContainerAnimationState] = useState<ContainerAnimation>('enter');

    // callbacks for changing state
    const setServicesToBusiness = async() => {
        // container exit animation setting
        setContainerAnimationState('exit');
        setTimeout(() => setServicesMode('business'), 1200);
    };
    const setServicesToTerritory = async() => {
        // container exit animation setting
        setContainerAnimationState('exit');
        setTimeout(() => setServicesMode('territory'), 1200);
    };

    // container enter animation setting
    useEffect(() => {
        setContainerAnimationState('enter');
    }, [servicesMode]);

    return (
        <section className={styles.main__section_services}>
            <ServicesIntroBlock 
                servicesMode={servicesMode}
                setServicesToBusiness={setServicesToBusiness}
                setServicesToTerritory={setServicesToTerritory}
            />
            <ServicesCardContainer 
                servicesMode={servicesMode}
                animationState={containerAnimationState} 
            />
            <ServicesAdditionalContainer />
        </section>
    )
};