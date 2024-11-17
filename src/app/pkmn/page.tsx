import PkmnLink from "@/components/pkmn/PkmnLink";
import { PkmnResult } from "@/lib/pkmn.types";
import Link from "next/link";

export default async function Page() {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/?limit=10000offset=0`);

    if (!res.ok) {
        return <div>Could not load data.</div>;
    }

    const { results } = await res.json();

    const pkmnNames = results.map((r: PkmnResult) => r.name);

    return (
        <div className="px-3">
            <h1 className="text-xl font-bold mt-4">PKMN</h1>
            <ol className="mx-auto flex flex-col items-start mt-4 list-decimal pl-8">
                {pkmnNames.map((n: string) => (
                    <li key={n}>
                        <PkmnLink pkmnName={n} />
                    </li>
                ))}
            </ol>
        </div>
    );
}
