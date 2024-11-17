import Link from "next/link";

export default function Home() {
    return (
        <main className="px-3 py-4">
            <h1 className="text-2xl font-bold">Poopydex</h1>
            <ul className="list-disc pl-4">
                <li>
                    <Link href="/pkmn">Pkmn List</Link>
                </li>
                <li>
                    <Link href="/pkmn">Types List</Link>
                </li>
            </ul>
        </main>
    );
}
