import { NamedResource } from "@/lib/pkmn/pkmn.types";

export async function GET() {
    const res = await fetch(`https://pokeapi.co/api/v2/nature/?limit=1000`);

    const { results } = (await res.json()) as { results: NamedResource[] };

    const names = results.map((r: NamedResource) => `"${r.name}": { increase: "", decrease: "" },`);

    return new Response(names.join("\n"));
}
