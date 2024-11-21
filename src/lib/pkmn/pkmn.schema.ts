interface NamedResource {
    name: string;
    url: string;
}

interface Ability {
    ability: NamedResource;
    is_hidden: boolean;
    slot: number;
}

interface Cry {
    latest: string;
    legacy: string;
}

interface Form {
    name: string;
    url: string;
}

interface GameIndex {
    game_index: number;
    version: NamedResource;
}

interface HeldItem {
    item: NamedResource;
    version_details: {
        rarity: number;
        version: NamedResource;
    }[];
}

interface Move {
    move: NamedResource;
    version_group_details: {
        level_learned_at: number;
        move_learn_method: NamedResource;
        version_group: NamedResource;
    }[];
}

interface Species {
    name: string;
    url: string;
}

interface Sprite {
    front_default: string;
    front_shiny: string;
    [key: string]: string | null | undefined; // Handles additional sprite keys dynamically
}

interface Stat {
    base_stat: number;
    effort: number;
    stat: NamedResource;
}

interface Type {
    slot: number;
    type: NamedResource;
}

interface Pokemon {
    abilities: Ability[];
    base_experience: number;
    cries: Cry;
    forms: Form[];
    game_indices: GameIndex[];
    height: number;
    held_items: HeldItem[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: Move[];
    name: string;
    order: number;
    past_abilities: Ability[];
    past_types: Type[];
    species: Species;
    sprites: Sprite;
    stats: Stat[];
    types: Type[];
    weight: number;
}

export type { Pokemon, NamedResource, Ability, Cry, Form, GameIndex, HeldItem, Move, Species, Sprite, Stat, Type };
