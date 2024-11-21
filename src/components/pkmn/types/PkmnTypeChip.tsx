"use client";

import { PkmnType } from "@/lib/pkmn/pkmn.types";
import { typeNameToColor, typeNameToDisplay } from "@/lib/pkmn/pkmn.utils";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface TypeChipProps extends Partial<HTMLAttributes<HTMLSpanElement>> {
    kind?: PkmnType | undefined;
}

export default function PkmnTypeChip({ kind, ...props }: TypeChipProps) {
    const { background } = typeNameToColor(kind);

    return (
        <span
            className={cn("px-3 py-1 text-sm rounded-full text-white w-max", props.className)}
            style={{ background, ...props.style }}
            {...props}>
            <span className="drop-shadow-lg">{typeNameToDisplay(kind)}</span>
        </span>
    );
}
