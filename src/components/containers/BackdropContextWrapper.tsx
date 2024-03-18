'use client';

import { BackdropContext } from "@/hooks/useBackdropContext";
import { useEffect, useState } from "react";
import Backdrop from "../Backdrop";
import { LazyMotion, domAnimation, AnimatePresence } from "framer-motion";

interface ContextWrapperInt {
    children: React.ReactNode;
}

export const BackdropContextWrapper = (props: ContextWrapperInt) => {

    const [isBackdropOpen, setIsOpen] = useState(false);
    // toggle state
    const toggleBackdrop = () => {
        setIsOpen(!isBackdropOpen);
    };
    const closeBackdrop = () => {
        setIsOpen(false);
    };
    const openBackdrop = () => {
        setIsOpen(true);
    };

    // test
    useEffect(() => {
        if (isBackdropOpen == true) {
            // prevent scroll on document.body
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = 'auto';
        }
    }, [isBackdropOpen]);


    return (
        <BackdropContext.Provider value={{
            isBackdropOpen,
            toggleBackdrop,
            openBackdrop,
            closeBackdrop,
        }}>
            <LazyMotion features={domAnimation}>
                <AnimatePresence>
                    {isBackdropOpen && (
                        <Backdrop />
                    )}
                </AnimatePresence>
            </LazyMotion>
            {props.children}
        </BackdropContext.Provider>
    )
};