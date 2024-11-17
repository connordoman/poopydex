"use client";

import Link from "next/link";

interface PkmnLinkProps {
    pkmnName: string;
}

export default function PkmnLink({ pkmnName }: PkmnLinkProps) {
    return (
        <Link className="underline" href={`/pkmn/${pkmnName}`}>
            {pkmnName}
        </Link>
    );
}
