"use client";

// import { Evolution } from "@/lib/pkmn/pkmn.types";
import { EvolutionChainLink, EvolutionDetail } from "@/lib/pkmn/evo/evolution.schema";

import PkmnLink from "../PkmnLink";
import { evolutionBreakdown } from "@/lib/pkmn/pkmn.utils";
import React from "react";
import { MoveRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EvolutionListProps {
    evolutions: Record<string, EvolutionDetail[]>;
    grouping: string;
}

export default function EvolutionList({ evolutions, grouping }: EvolutionListProps) {
    const evoBreakdown = evolutionBreakdown(evolutions, grouping);

    return (
        <Card className="gap-1 justify-center w-full">
            <CardHeader>
                <CardTitle>Evolutions</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="flex flex-row items-start justify-center gap-2 flex-wrap leading-none">
                    {evoBreakdown.map((ev, i) => {
                        return (
                            <React.Fragment key={"ev_" + i + "_" + ev.species}>
                                <span className="inline-flex flex-col items-center pt-1 w-min">
                                    <PkmnLink pkmnName={ev.species} />
                                    {ev.techniques && ev.techniques.length > 0 ? (
                                        <span className="text-xs text-center">
                                            ({ev.techniques.join(", or ").trim()})
                                        </span>
                                    ) : null}
                                </span>
                                {i === evoBreakdown.length - 1 ? null : !ev.or ? (
                                    <MoveRight className="h-7" size={16} />
                                ) : (
                                    <span className="pt-1"> or </span>
                                )}
                            </React.Fragment>
                        );
                    })}
                </p>
            </CardContent>
        </Card>
    );
}
