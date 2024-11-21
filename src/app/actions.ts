"use server";

export async function fetchPkmnAndSpeciesData(name: string): Promise<{ pkmn: any; species: any }> {
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
