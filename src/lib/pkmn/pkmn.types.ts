export type NamedResource = { name: string; url: string };

export type Language = { name: string };

export type PkmnName = { name: string; language: Language };

export type StatName = "hp" | "attack" | "defense" | "special attack" | "special defense" | "speed";

export interface Stat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

export interface ChartableStat {
    name: string;
    base: number;
}

export interface Move {
    move: NamedResource;
    version_group_details: VersionGroupDetails[];
}

export interface VersionGroupDetails {
    level_learned_at: number;
    move_learn_method: NamedResource;
    version_group: NamedResource;
}

export interface MoveAtLevel {
    move: NamedResource;
    level: number;
    method: NamedResource;
}

export type PkmnType =
    | "normal"
    | "fighting"
    | "flying"
    | "poison"
    | "ground"
    | "rock"
    | "bug"
    | "ghost"
    | "steel"
    | "fire"
    | "water"
    | "grass"
    | "electric"
    | "psychic"
    | "ice"
    | "dragon"
    | "dark"
    | "fairy"
    | "stellar"
    | "unknown";

export type PkmnVersion =
    | "red-blue"
    | "yellow"
    | "gold-silver"
    | "crystal"
    | "ruby-sapphire"
    | "emerald"
    | "firered-leafgreen"
    | "diamond-pearl"
    | "platinum"
    | "heartgold-soulsilver"
    | "black-white"
    | "colosseum"
    | "xd"
    | "black-2-white-2"
    | "x-y"
    | "omega-ruby-alpha-sapphire"
    | "sun-moon"
    | "ultra-sun-ultra-moon"
    | "lets-go-pikachu-lets-go-eevee"
    | "sword-shield"
    | "the-isle-of-armor"
    | "the-crown-tundra"
    | "brilliant-diamond-and-shining-pearl"
    | "legends-arceus"
    | "scarlet-violet"
    | "the-teal-mask"
    | "the-indigo-disk";

export type PkmnMoveMethod =
    | "level-up"
    | "egg"
    | "tutor"
    | "machine"
    | "stadium-surfing-pikachu"
    | "light-ball-egg"
    | "colosseum-purification"
    | "xd-shadow"
    | "xd-purification"
    | "form-change"
    | "zygarde-cube";

export type EvolutionMethod =
    | "level-up"
    | "trade"
    | "use-item"
    | "shed"
    | "spin"
    | "tower-of-darkness"
    | "tower-of-waters"
    | "three-critical-hits"
    | "take-damage"
    | "other"
    | "agile-style-move"
    | "strong-style-move"
    | "recoil-damage";

export type Evolution = {
    evolves_to?: Evolution | Evolution[] | null;
    species?: PkmnName | null;
};

export type MovesByVersion = Record<string, MoveAtLevel[]>;
