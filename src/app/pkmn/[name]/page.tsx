import EvolutionList from "@/components/pkmn/evo/EvolutionList";
import MovesList from "@/components/pkmn/moves/MovesList";
import PkmnLink from "@/components/pkmn/PkmnLink";
import Stats from "@/components/pkmn/Stats";
import PkmnTypeChip from "@/components/pkmn/types/PkmnTypeChip";
import { Evolution, Move, PkmnName } from "@/lib/pkmn.types";
import { getSpriteURL, movesListByVersion } from "@/lib/pkmn.utils";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import React from "react";

interface PkmnPageProps {
    params: Promise<{ name: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata(
    { params, searchParams }: PkmnPageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const name = (await params).name;

    // fetch species data
    const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
    if (!speciesRes.ok) {
        throw new Error(`Error fetching species data for: ${name}`);
    }

    const { names } = await speciesRes.json();
    const displayName = names.find((dn: PkmnName) => dn.language.name === "en").name;

    return {
        title: displayName,
    };
}

export default async function Page({ params }: PkmnPageProps) {
    const name = (await params).name;

    // fetch base data
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!res.ok) {
        throw new Error(`Error fetching pokemon: ${name}`);
    }

    // fetch species data
    const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
    if (!speciesRes.ok) {
        throw new Error(`Error fetching species data for: ${name}`);
    }

    const species = await speciesRes.json();

    const {
        names: displayNames,
        evolution_chain: { url: evolutionUrl },
    } = species;

    // fetch relevant evolution data from species
    const evoChainRes = await fetch(`${evolutionUrl}`);
    if (!evoChainRes.ok) {
        throw new Error(`Error fetching evolution chain: ${name}`);
    }

    const { chain } = await evoChainRes.json();

    // process data into useable forms
    const displayName = displayNames.find((dn: PkmnName) => dn.language.name === "en").name;

    const { id, types, stats, moves } = await res.json();

    const type1 = types[0].type.name.replaceAll("-", " ");
    const type2 = types[1] ? types[1].type.name.replaceAll("-", " ") : undefined;

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
            <EvolutionList chain={chain} />
            <Stats data={stats} />
            <MovesList moves={movesListByVersion(moves)} />
        </div>
    );
}
