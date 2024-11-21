interface NamedResource {
    name: string;
    url: string;
}

interface EvolutionDetail {
    gender: number | null;
    held_item: NamedResource | null;
    item: NamedResource | null;
    known_move: NamedResource | null;
    known_move_type: NamedResource | null;
    location: NamedResource | null;
    min_affection: number | null;
    min_beauty: number | null;
    min_happiness: number | null;
    min_level: number | null;
    needs_overworld_rain: boolean;
    party_species: NamedResource | null;
    party_type: NamedResource | null;
    relative_physical_stats: number | null;
    time_of_day: string;
    trade_species: NamedResource | null;
    trigger: NamedResource;
    turn_upside_down: boolean;
}

interface EvolutionChainLink {
    is_baby: boolean;
    species: NamedResource;
    evolution_details: EvolutionDetail[];
    evolves_to: EvolutionChainLink[];
}

interface EvolutionChain {
    id: number;
    baby_trigger_item: NamedResource | null;
    chain: EvolutionChainLink;
}

export type { NamedResource, EvolutionDetail, EvolutionChainLink, EvolutionChain };
