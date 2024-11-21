import { evolutionBreakdown } from "@/lib/pkmn/pkmn.utils";
import { fetchEvolutionChain } from "../actions";
import PkmnLink from "@/components/pkmn/PkmnLink";
import { MoveRight } from "lucide-react";
import React from "react";

export default async function EvolutionPage() {
    const { evolutions, grouping } = await fetchEvolutionChain("eevee");

    const evoBreakdown = evolutionBreakdown(evolutions, grouping);

    return (
        <div className="p-4">
            <p className="flex flex-row items-start justify-center gap-2 flex-wrap leading-none">
                {evoBreakdown.map((ev, i) => {
                    return (
                        <React.Fragment key={"ev_" + i + "_" + ev.species}>
                            <span className="inline-flex flex-col items-center pt-1 w-min">
                                <PkmnLink pkmnName={ev.species} />
                                {ev.techniques && ev.techniques.length > 0 ? (
                                    <span className="text-xs text-center">({ev.techniques.join(", or ")})</span>
                                ) : null}
                            </span>
                            {!ev.or ? (
                                <MoveRight className="h-7" size={16} />
                            ) : i === evoBreakdown.length - 1 ? null : (
                                <span className="pt-1"> or </span>
                            )}
                        </React.Fragment>
                    );
                })}
            </p>
            {/* <pre>{JSON.stringify(evoBreakdown, null, 2)}</pre> */}
        </div>
    );
}
