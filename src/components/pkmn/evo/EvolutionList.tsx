"use client";

// import { Evolution } from "@/lib/pkmn/pkmn.types";
import { EvolutionChain, EvolutionChainLink } from "@/lib/pkmn/evo/evolution.schema";

import PkmnLink from "../PkmnLink";

interface EvolutionListProps {
    chain: EvolutionChainLink;
}

export default function EvolutionList({ chain }: EvolutionListProps) {
    const evolutionChain = (chain: EvolutionChainLink): string => {
        const evo = (next_evo: EvolutionChainLink | EvolutionChainLink[]): string | undefined => {
            // if the evolution is an array of optionals,
            // join them after recursively checking their downstream evolutions
            if (Array.isArray(next_evo)) {
                if (next_evo.length === 0) {
                    return undefined;
                }

                // join the parallel evolution branches with an or-like separator
                return next_evo.map((ev: EvolutionChainLink) => evo(ev)).join("|");
            } else if (next_evo.evolves_to === null || next_evo.evolves_to === undefined) {
                return next_evo.species?.name ?? "???";
            }

            // otherwise, join this chain into one string
            const then = evo(next_evo.evolves_to);

            return `${next_evo.species?.name}${then ? `,${then}` : ""}`;
        };

        // if top level evolution is an empty array or nothing, return only the species' name
        if (!chain.evolves_to || (Array.isArray(chain.evolves_to) && chain.evolves_to.length === 0)) {
            return chain.species?.name ?? "???";
        }

        // there must otherwise be an evolution, so recursively work through it
        return `${chain.species?.name ?? "???"},${evo(chain.evolves_to)}`;
    };

    const evolutions = evolutionChain(chain).split(",");

    return (
        <div className=" gap-1 justify-center">
            {evolutions.map((ev, i) => {
                if (ev.indexOf("|") > -1) {
                    return (
                        <span key={`${ev}_option_${i}`}>
                            {ev.split("|").map((or, j) => (
                                <span key={or + "_ev_" + j}>
                                    {j > 0 ? " or " : " then "}
                                    <PkmnLink pkmnName={or} />
                                </span>
                            ))}
                        </span>
                    );
                }
                return (
                    <span key={`${ev}_evo_${i}`}>
                        {evolutions.length === 1 ? "just " : null}
                        {i > 0 ? " then " : null}
                        <PkmnLink pkmnName={ev} />
                        {i < evolutions.length - 1 ? "," : ""}
                    </span>
                );
            })}
        </div>
    );
}
