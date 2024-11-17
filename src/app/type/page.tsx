import PkmnTypeChip from "@/components/pkmn/types/PkmnTypeChip";
import { PkmnName, PkmnType } from "@/lib/pkmn.types";

export default async function TypesPage() {
    const res = await fetch(`https://pokeapi.co/api/v2/type/`);

    if (!res.ok) {
        return <div>Could not load data.</div>;
    }

    const { results } = await res.json();

    const typeNames: PkmnType[] = results.map((r: PkmnName) => r.name);

    return (
        <div className="flex flex-col items-center gap-3 mt-4">
            <h1 className="font-bold text-2xl">Types</h1>
            <div className="flex flex-col px-3 gap-2">
                {typeNames.map((name: PkmnType, i) => (
                    // <div key={name + i}>{`case "${name}": return ""`}</div>
                    <div key={name + i}>
                        {i + 1}. <PkmnTypeChip kind={name} />
                    </div>
                ))}
            </div>
        </div>
    );
}
