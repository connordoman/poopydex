import { HTMLAttributes } from "react";

interface LevelProps extends HTMLAttributes<HTMLSpanElement> {
    lvl?: number;
}

export default function Level({ lvl, ...props }: LevelProps) {
    return (
        <span className="whitespace-nowrap">
            <span className="text-[0.5rem] uppercase mr-px">lvl</span>
            <span>{lvl}</span>
        </span>
    );
}
