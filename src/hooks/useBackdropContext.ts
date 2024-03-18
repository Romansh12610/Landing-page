
import { createContext, useContext } from "react";
import type { BackdropContextInt } from "@/types/backdropContextInt";

// context for btn menu clicking
export const BackdropContext = createContext<BackdropContextInt | null>(null);

export const useBackdropContext = () => {
    return useContext(BackdropContext);
}