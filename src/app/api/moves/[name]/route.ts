import { Move, MoveAtLevel, MovesByVersion, NamedResource, PkmnVersion } from "@/lib/pkmn.types";
import { movesListByVersion } from "@/lib/pkmn.utils";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ name: string }> }) {
    const { name } = await params;

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

    if (!res.ok) {
        return Response.json({ error: "Error fetching Pkmn: " + name }, { status: res.status });
    }

    const pkmnData = await res.json();

    if (!pkmnData) {
        return Response.json({ error: "Not found." }, { status: 404 });
    }

    const moves: Move[] = pkmnData.moves;

    const versionsSet = movesListByVersion(moves);

    return Response.json(versionsSet);
}
