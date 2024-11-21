import PkmnList from "@/components/pkmn/PkmnList";
import { NamedResource } from "@/lib/pkmn/pkmn.types";

export default async function Page() {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=2000`);

    if (!res.ok) {
        return <div>Could not load data.</div>;
    }

    const { results } = await res.json();

    console.log({ len: results.length });

    return (
        <div className="px-3 w-full max-w-sm mx-auto">
            <h1 className="text-xl font-bold mt-4 w-max mx-auto mb-3">PKMN</h1>
            <PkmnList items={results.map((r: NamedResource, i: number) => ({ name: r, id: i + 1 }))} />
        </div>
    );
}
