import { NamedResource } from "@/lib/pkmn/pkmn.types";

export async function GET() {
    const res = await fetch(`https://pokeapi.co/api/v2/version-group/?limit=1000`);

    const { results } = await res.json();

    const versionNames = results.map((r: NamedResource) => `"${r.name}" |`);

    return new Response(versionNames.join("\n"));
}
