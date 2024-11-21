"use client";

import { PkmnName } from "@/lib/pkmn/pkmn.types";
import React, { useState } from "react";
import PkmnLink from "./PkmnLink";
import { Input } from "../ui/input";
import { DataTable, SortableHeader } from "../ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { formatName } from "@/lib/pkmn/pkmn.utils";

export const pkmnColumns: ColumnDef<{
    name: PkmnName;
    id: number;
}>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <SortableHeader col={column} className="w-16">
                    ID
                </SortableHeader>
            );
        },
        cell: ({ row }) => {
            const id = row.getValue("id");

            if (id) {
                return <div className="mx-3">{`${id}.`}</div>;
            }

            return "Unknown Pkmn";
        },
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return <SortableHeader col={column}>Name</SortableHeader>;
        },
        cell: ({ row }) => {
            const name = row.getValue("name");

            if (name) {
                const n = (name as PkmnName).name;
                return (
                    <div className="mx-4">
                        <PkmnLink pkmnName={n} caps />
                    </div>
                );
            }

            return "Unknown Pkmn";
        },
    },
];

interface PkmnListProps {
    items: { name: PkmnName; id: number }[];
}

export default function PkmnList({ items }: PkmnListProps) {
    const [search, setSearch] = useState<string>("");

    const roster =
        search.trim() === ""
            ? items
            : items.filter(({ name }) => name.name.toLowerCase().indexOf(search.toLowerCase()) > -1);

    return (
        <div className="w-full max-w-xl flex flex-col gap-3">
            <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
                placeholder="Search by name..."
            />
            <DataTable columns={pkmnColumns} data={roster} />
        </div>
    );
}
