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
