import { NamedResource } from "@/lib/pkmn/pkmn.types";

export async function GET() {
    const res = await fetch(`https://pokeapi.co/api/v2/move-learn-method/?limit=1000`);

    const { results } = await res.json();

    const names = results.map((r: NamedResource) => `case "${r.name}": return`);

    return new Response(names.join("\n"));
}
