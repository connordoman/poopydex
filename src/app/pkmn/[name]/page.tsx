import { PkmnName } from "@/lib/types/pkmn";
import React from "react";

interface Stat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

interface Move {
    move: {
        name: string;
        url: string;
    };
    version_group_details: [];
}

export default async function Page({ params }: { params: Promise<{ name: string }> }) {
    const name = (await params).name;

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!res.ok) {
        return <div>Error fetching pokemon: {name}</div>;
    }

    const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
    if (!speciesRes.ok) {
        return <div>Error fetching species data for: {name}</div>;
    }

    const { names: displayNames } = await speciesRes.json();

    const displayName = displayNames.find((dn: PkmnName) => dn.language.name === "en").name;

    const { types, stats, moves } = await res.json();

    const type1 = types[0].type.name.replaceAll("-", " ");
    const type2 = types[1] ? types[1].type.name.replaceAll("-", " ") : undefined;

    const readableStats = stats.map((s: Stat) => ({ base: s.base_stat, name: s.stat.name.replaceAll("-", " ") }));

    const moveNames = moves.map((m: Move) => m.move.name.replaceAll("-", " "));

    return (
        <div className="flex flex-col items-center gap-6">
            <h1 className="font-bold text-2xl mt-4">{displayName}</h1>
            <div className="flex flex-row gap-4">
                <div>{type1}</div>
                {type2 ? <div>{type2}</div> : null}
            </div>
            <div className="flex flex-col items-center">
                <h3 className="font-semibold text-xl text-center">Stats</h3>
                <ol className="flex flex-col gap-2 ">
                    {readableStats.map((s: { base: number; name: string }) => {
                        const { base, name } = s;

                        return (
                            <li key={name + name} className="flex flex-row gap-4 w-full justify-between">
                                <strong className="font-semibold">{name}</strong>
                                <span className="">{base}</span>
                            </li>
                        );
                    })}
                </ol>
            </div>
            <div>
                <h3 className="font-semibold text-xl text-center">Moves</h3>
                <ul className="flex flex-col gap-2 items-center">
                    {moveNames.map((m: string, i: number) => (
                        <li key={m}>
                            {i + 1}. {m}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
