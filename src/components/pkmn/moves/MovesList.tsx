"use client";

import { DataTable } from "@/components/ui/data-table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VERSION_NAMES } from "@/lib/pkmn.consts";
import { MovesByVersion, PkmnMoveMethod, PkmnVersion } from "@/lib/pkmn.types";
import { formatName, moveMethodToDisplay, versionNameToDisplay } from "@/lib/pkmn.utils";
import { sortByOrder } from "@/lib/utils";
import { useState } from "react";
import { moveRowColumns } from "./MovesColumns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="font-bold">Moves</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                <Select onValueChange={(v) => setVersion(v as PkmnVersion)}>
                    <SelectTrigger className="w-lg">
                        <SelectValue placeholder="Select a game..." className="" />
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
                    notFound="Select a game first."
                />
            </CardContent>
        </Card>
    );
}
