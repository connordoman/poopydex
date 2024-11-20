"use client";

import { formatName } from "@/lib/pkmn.utils";
import Link from "next/link";

interface PkmnLinkProps {
    pkmnName: string;
    caps?: boolean;
}

export default function PkmnLink({ pkmnName, caps = false }: PkmnLinkProps) {
    return (
        <Link className="underline" href={`/pkmn/${pkmnName}`}>
            {caps ? formatName(pkmnName) : pkmnName}
        </Link>
    );
}
