"use client";

import { PkmnType } from "@/lib/pkmn.types";
import { typeNameToColor, typeNameToDisplay } from "@/lib/pkmn.utils";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface TypeChipProps extends Partial<HTMLAttributes<HTMLSpanElement>> {
    kind: PkmnType;
}

export default function PkmnTypeChip({ ...props }: TypeChipProps) {
    const filteredProps = Object.assign(structuredClone(props), { kind: undefined }) as Omit<TypeChipProps, "kind">;

    const { background } = typeNameToColor(props.kind);

    return (
        <span
            className={cn("px-3 py-1 text-sm rounded-full text-white w-max", props.className)}
            style={{ background, ...props.style }}
            {...filteredProps}>
            <span className="drop-shadow-lg">{typeNameToDisplay(props.kind)}</span>
        </span>
    );
}
