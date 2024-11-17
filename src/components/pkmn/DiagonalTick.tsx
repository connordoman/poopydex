import { statNameToAbbreviation } from "@/lib/pkmn.utils";
import { SVGProps } from "react";
import { TickItem } from "recharts/types/util/types";

interface DiagonalTickProps extends SVGProps<SVGTextElement> {
    // x: number;
    // y: number;
    payload?: TickItem;
}

export default function DiagonalTick({ x, y, payload }: DiagonalTickProps) {
    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={8} textAnchor="end" fill="#666" transform="rotate(-35)">
                {statNameToAbbreviation(payload?.value ?? "").toUpperCase()}
            </text>
        </g>
    );
}
