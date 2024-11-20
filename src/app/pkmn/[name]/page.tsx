import MovesList from "@/components/pkmn/moves/MovesList";
import PkmnLink from "@/components/pkmn/PkmnLink";
import Stats from "@/components/pkmn/Stats";
import PkmnTypeChip from "@/components/pkmn/types/PkmnTypeChip";
import { Evolution, Move, PkmnName } from "@/lib/pkmn.types";
import { getSpriteURL, movesListByVersion } from "@/lib/pkmn.utils";
import Image from "next/image";
import React from "react";

export default async function Page({ params }: { params: Promise<{ name: string }> }) {
    const name = (await params).name;

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!res.ok) {
        // return <div>Error fetching pokemon: {name}</div>;
        throw new Error(`Error fetching pokemon: ${name}`);
    }

    const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
    if (!speciesRes.ok) {
        return <div>Error fetching species data for: {name}</div>;
    }

    // const { names: displayNames } = await speciesRes.json();
    const species = await speciesRes.json();

    const {
        names: displayNames,
        evolution_chain: { url: evolutionUrl },
    } = species;

    const evoChainRes = await fetch(`${evolutionUrl}`);
    if (!evoChainRes.ok) {
        return <div>Error fetching evolution chain.</div>;
    }
    const { chain } = await evoChainRes.json();

    const evolutionChain = (chain: Evolution): string => {
        const evo = (next_evo: Evolution | Evolution[]): string | undefined => {
            if (Array.isArray(next_evo)) {
                if (next_evo.length === 0) {
                    return undefined;
                }

                return next_evo.map((ev: Evolution) => evo(ev)).join("|");
            } else if (next_evo.evolves_to === null || next_evo.evolves_to === undefined) {
                return next_evo.species?.name ?? "???";
            }

            const then = evo(next_evo.evolves_to);

            return `${next_evo.species?.name}${then ? `,${then}` : ""}`;
        };

        if (!chain.evolves_to || (Array.isArray(chain.evolves_to) && chain.evolves_to.length === 0)) {
            return chain.species?.name ?? "???";
        }

        return `${chain.species?.name ?? "???"},${evo(chain.evolves_to)}`;
    };

    const evolutions = evolutionChain(chain).split(",");

    const displayName = displayNames.find((dn: PkmnName) => dn.language.name === "en").name;

    const { id, types, stats, moves } = await res.json();

    const type1 = types[0].type.name.replaceAll("-", " ");
    const type2 = types[1] ? types[1].type.name.replaceAll("-", " ") : undefined;

    // const readableStats = stats.map((s: Stat) => ({ base: s.base_stat, name: s.stat.name.replaceAll("-", " ") }));

    const moveNames = moves.map((m: Move) => m.move.name.replaceAll("-", " "));

    const spriteURL = getSpriteURL(id);

    return (
        <div className="flex flex-col items-center gap-6 px-3 pb-4">
            <div className="text-center">
                <Image src={spriteURL} alt={`Image of ${name}`} width={128} height={128} className="pixelated mt-2" />
                <h1 className="font-bold text-2xl mt-4">{displayName}</h1>
            </div>
            <div className="flex flex-row gap-2">
                <PkmnTypeChip kind={type1} />
                {type2 ? <PkmnTypeChip kind={type2} /> : null}
            </div>
            <div className="flex flex-row gap-1">
                {evolutions.map((ev, i) => {
                    if (ev.indexOf("|") > -1) {
                        return (
                            <div key={`${ev}_option_${i}`}>
                                {ev.split("|").map((or, j) => (
                                    <span key={or + "_ev_" + j}>
                                        {j > 0 ? ", or " : "then "}
                                        <PkmnLink pkmnName={or} />
                                    </span>
                                ))}
                            </div>
                        );
                    }
                    return (
                        <span key={`${ev}_evo_${i}`}>
                            {i > 0 ? " then " : null}
                            <PkmnLink pkmnName={ev} />
                            {i < evolutions.length - 1 ? "," : ""}
                        </span>
                    );
                })}
            </div>
            <Stats data={stats} />
            <div className="w-full">
                <h3 className="font-semibold text-xl text-center mb-2">Moves</h3>
                <MovesList moves={movesListByVersion(moves)} />
                {/* <hr className="mt-4" />
                <ul className="flex flex-col gap-2 items-start w-full max-w-md mt-2">
                    {moveNames.map((m: string, i: number) => (
                        <li key={m}>
                            {i + 1}. {m}
                        </li>
                    ))}
                </ul> */}
            </div>
        </div>
    );
}
