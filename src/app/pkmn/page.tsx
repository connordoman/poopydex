import PkmnList from "@/components/pkmn/PkmnList";
import { NamedResource } from "@/lib/pkmn.types";

export default async function Page() {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/?limit=10000offset=0`);

    if (!res.ok) {
        return <div>Could not load data.</div>;
    }

    const { results } = await res.json();

    return (
        <div className="px-3 w-full max-w-sm mx-auto">
            <h1 className="text-xl font-bold mt-4 w-max mx-auto mb-3">PKMN</h1>
            <PkmnList items={results.map((r: NamedResource, i: number) => ({ name: r, id: i + 1 }))} />
        </div>
    );
}
