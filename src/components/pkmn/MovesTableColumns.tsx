import { ColumnDef } from "@tanstack/react-table";
import Level from "./Level";

export type MoveRow = {
    name: string;
    level: number;
    method: string;
};

export const moveRowColumns: ColumnDef<MoveRow>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "level",
        header: "Level",

        cell: ({ row }) => {
            const level = row.getValue("level") as number;

            return <Level lvl={level ?? 0} />;
        },
    },
    {
        accessorKey: "method",
        header: "Method",
    },
];
