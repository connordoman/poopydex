"use client";

import { DataTable } from "@/components/ui/data-table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TableCaption, Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { VERSION_NAMES } from "@/lib/pkmn.consts";
import { MovesByVersion, PkmnMoveMethod, PkmnVersion } from "@/lib/pkmn.types";
import { formatName, moveMethodToDisplay, versionNameToDisplay } from "@/lib/pkmn.utils";
import { sortByOrder } from "@/lib/utils";
import { useState } from "react";
import { moveRowColumns } from "../MovesTableColumns";

interface MovesListProps {
    moves: MovesByVersion;
}

export default function MovesList({ moves }: MovesListProps) {
    const [version, setVersion] = useState<PkmnVersion | null>(null);

    const triggers: { key: string; label: string }[] = sortByOrder(
        Object.entries(moves).map(([version]) => version),
        VERSION_NAMES
    ).map((v) => {
        console.log({ v });

        return {
            key: v,
            label: versionNameToDisplay(v),
        };
    });

    const currentMoves = moves[version ?? ""] ?? [];

    return (
        <div className="w-xl flex flex-col gap-3">
            <Select onValueChange={(v) => setVersion(v as PkmnVersion)}>
                <SelectTrigger className="w-lg">
                    <SelectValue placeholder="Select a generation..." className="" />
                </SelectTrigger>
                <SelectContent className="w-sm">
                    {triggers.map((t, i) => (
                        <SelectItem key={t.key + i} value={t.key}>
                            {t.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <DataTable
                columns={moveRowColumns}
                data={currentMoves
                    .toSorted((a, b) => a.level - b.level)
                    .map((mv, i) => ({
                        name: formatName(mv.move.name),
                        level: mv.level,
                        method: moveMethodToDisplay(mv.method.name as PkmnMoveMethod),
                    }))}
            />
        </div>
    );
}
