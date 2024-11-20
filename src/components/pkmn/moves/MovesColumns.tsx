import { Column, ColumnDef } from "@tanstack/react-table";
import Level from "../Level";
import { Button } from "../../ui/button";
import { ArrowUpDown } from "lucide-react";
import { SortableHeader } from "@/components/ui/data-table";

export type MoveRow = {
    name: string;
    level: number;
    method: string;
};

export const moveRowColumns: ColumnDef<MoveRow>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return <SortableHeader col={column}>Name</SortableHeader>;
        },
    },
    {
        accessorKey: "level",
        header: ({ column }) => {
            return <SortableHeader col={column}>Level</SortableHeader>;
        },
        cell: ({ row }) => {
            const level = row.getValue("level") as number;

            return <Level lvl={level ?? 0} />;
        },
    },
    {
        accessorKey: "method",
        header: ({ column }) => {
            return <SortableHeader col={column}>Method</SortableHeader>;
        },
    },
];
