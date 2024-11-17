export type PkmnResult = { name: string; url: string };

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
    move: {
        name: string;
        url: string;
    };
    version_group_details: [];
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

export type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;

export type Evolution = {
    evolves_to?: Evolution | Evolution[] | null;
    species?: PkmnName | null;
};
