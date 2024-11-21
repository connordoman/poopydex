import { NamedResource } from "@/lib/pkmn/pkmn.types";

export async function GET() {
    const res = await fetch(`https://pokeapi.co/api/v2/evolution-trigger/other`);

    const { pokemon_species } = await res.json();

    const names = pokemon_species.map((r: NamedResource) => `case "${r.name}": return;`);

    return new Response(names.join("\n"));
}
