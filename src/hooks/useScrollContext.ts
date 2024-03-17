import { useContext, createContext } from "react";
import type { ScrollContextInt } from "@/types/scrollContextInt";

// SCROLL CONTEXT, to access current scroll value
// in child components
export const ScrollContext = createContext<ScrollContextInt | null>(null);

export const useScrollContext = () => {
    const scrollContext = useContext(ScrollContext);
    return scrollContext;
};