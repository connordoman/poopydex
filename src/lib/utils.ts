import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function sortByOrder(toSort: string[], order: string[]): string[] {
    const orderMap = new Map<string, number>();
    order.forEach((order, index) => {
        orderMap.set(order, index);
    });

    return toSort.toSorted((a, b) => {
        const indexA = orderMap.get(a) ?? Infinity;
        const indexB = orderMap.get(b) ?? Infinity;
        return indexA - indexB;
    });
}
