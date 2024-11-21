"use server";

import { EvolutionChain, EvolutionChainLink, EvolutionDetail } from "@/lib/pkmn/evo/evolution.schema";
import { NamedResource, Pokemon } from "@/lib/pkmn/pkmn.schema";
import { evolutionMethodToDisplay } from "@/lib/pkmn/pkmn.utils";
import { PokemonSpecies } from "@/lib/pkmn/species/species.schema";

export async function fetchPkmnAndSpeciesData(name: string): Promise<{ pkmn: Pokemon; species: PokemonSpecies }> {
    // fetch base data
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!res.ok) {
        throw new Error(`Error fetching pokemon: ${name}`);
    }

    const pkmn = await res.json();
    if (!pkmn) {
        throw new Error("Error parsing Pkmn data.");
    }

    // fetch species data
    const speciesRes = await fetch(pkmn.species.url);
    if (!speciesRes.ok) {
        throw new Error(`Error fetching species data for: ${name}`);
    }

    const species = await speciesRes.json();
    if (!species) {
        throw new Error("Error parsing species data.");
    }

    return {
        pkmn,
        species,
    };
}

export async function fetchEvolutionChain(
    name: string
): Promise<{ evolutions: Record<string, EvolutionDetail[]>; grouping: string }> {
    const evolutions: Record<string, EvolutionDetail[]> = {};

    try {
        const { species } = await fetchPkmnAndSpeciesData(name);

        const evoRes = await fetch(species.evolution_chain.url);
        if (!evoRes.ok) {
            throw new Error("Could not fetch species' evolution chain.");
        }

        const evo = (await evoRes.json()) as EvolutionChain;

        const recursiveEvoDiscovery = (chain: EvolutionChainLink): string => {
            evolutions[chain.species.name] = chain.evolution_details;

            if (chain.evolves_to.length === 0) {
                return chain.species.name;
            }

            const layer: string[] = [];

            for (let i = 0; i < chain.evolves_to.length; i++) {
                layer.push(recursiveEvoDiscovery(chain.evolves_to[i]));
            }

            return chain.species.name + "," + layer.join("|");
        };

        const grouping = recursiveEvoDiscovery(evo.chain);

        console.log({ otherGrouping: grouping });

        return {
            evolutions,
            grouping,
        };
    } catch (e) {
        console.error(`Error fetching evolution chain for ${name}: ${e}`);
        return {
            evolutions,
            grouping: "",
        };
    }
}
