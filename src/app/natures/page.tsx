import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatName } from "@/lib/pkmn/pkmn.utils";

const natures: Record<string, { increase: string; decrease: string }> = {
    hardy: { increase: "attack", decrease: "attack" },
    lonely: { increase: "attack", decrease: "defense" },
    brave: { increase: "attack", decrease: "speed" },
    adamant: { increase: "attack", decrease: "special-attack" },
    naughty: { increase: "attack", decrease: "special-defense" },
    bold: { increase: "defense", decrease: "attack" },
    docile: { increase: "defense", decrease: "defense" },
    relaxed: { increase: "defense", decrease: "speed" },
    impish: { increase: "defense", decrease: "special-attack" },
    lax: { increase: "defense", decrease: "special-defense" },
    timid: { increase: "speed", decrease: "attack" },
    hasty: { increase: "speed", decrease: "defense" },
    serious: { increase: "speed", decrease: "speed" },
    jolly: { increase: "speed", decrease: "special-attack" },
    naive: { increase: "speed", decrease: "special-defense" },
    modest: { increase: "special-attack", decrease: "attack" },
    mild: { increase: "special-attack", decrease: "defense" },
    quiet: { increase: "special-attack", decrease: "speed" },
    bashful: { increase: "special-attack", decrease: "special-attack" },
    rash: { increase: "special-attack", decrease: "special-defense" },
    calm: { increase: "special-defense", decrease: "attack" },
    gentle: { increase: "special-defense", decrease: "defense" },
    sassy: { increase: "special-defense", decrease: "speed" },
    careful: { increase: "special-defense", decrease: "special-attack" },
    quirky: { increase: "special-defense", decrease: "special-defense" },
};

export default async function NaturesPage() {
    return (
        <div className="flex flex-col w-full max-w-md mx-auto p-3">
            <h1 className="text-center text-2xl font-bold">Natures</h1>
            <Table className="">
                <TableCaption>A list of nature effects.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nature</TableHead>
                        <TableHead>Increase</TableHead>
                        <TableHead>Decrease</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Object.keys(natures).map((n: string) => {
                        const { increase, decrease } = natures[n];
                        return (
                            <TableRow key={n}>
                                <TableCell className="font-bold">{n}</TableCell>
                                <TableCell>{formatName(increase)}</TableCell>
                                <TableCell>{formatName(decrease)}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
