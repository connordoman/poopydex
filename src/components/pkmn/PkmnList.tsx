"use client";

import { PkmnName } from "@/lib/pkmn.types";
import React, { useState } from "react";
import PkmnLink from "./PkmnLink";
import { Input } from "../ui/input";

interface PkmnListProps {
    items: { name: PkmnName; id: number }[];
}

export default function PkmnList({ items }: PkmnListProps) {
    const [search, setSearch] = useState<string>("");

    const roster = search.trim() === "" ? items : items.filter(({ name }) => name.name.indexOf(search) > -1);

    return (
        <div className="w-full max-w-xl">
            <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
                placeholder="Search by name..."
            />
            <ul className="flex flex-col w-full mt-2">
                {roster.map(({ name, id }) => (
                    <li key={`pkmn_list_${name}_${id}`} className="flex flex-row gap-2">
                        <span className="w-10 text-right">
                            {id}
                            {". "}
                        </span>
                        <PkmnLink pkmnName={name.name} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
