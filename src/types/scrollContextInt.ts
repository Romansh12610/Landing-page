export interface ScrollContextInt {
    currentScrollValue: React.RefObject<number>;
    scrollEndDistance: number;
    canScrollChildren: boolean;
}