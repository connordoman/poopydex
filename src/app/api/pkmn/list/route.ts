type PkmnResult = { name: string; url: string };

export async function GET() {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`);

    if (!res.ok) {
        return Response.json({ error: "Request failed." }, { status: 500 });
    }

    const { results } = await res.json();

    const names = results.map((r: PkmnResult) => r.name);

    return Response.json({ names }, { status: 200 });
}
