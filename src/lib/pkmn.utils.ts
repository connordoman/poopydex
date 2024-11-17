import { ChartableStat, Stat, StatName } from "./pkmn.types";

export function statArrayToChartable(stats: Stat[]): ChartableStat[] {
    console.log({ stats });

    const chartable = stats.map(({ base_stat, stat }) => ({
        name: stat.name.replace("-", " ").toUpperCase(),
        base: base_stat,
    }));

    console.log({ chartable });

    return chartable;
}

export function statNameToAbbreviation(stat: StatName): string {
    const statName = stat.toLowerCase();

    switch (statName) {
        case "hp":
            return "hp";
        case "attack":
            return "atk";
        case "defense":
            return "def";
        case "special attack":
            return "sp. atk";
        case "special defense":
            return "sp. def";
        case "speed":
            return "spd";
        default:
            return "???";
    }
}

export function getSpriteURL(id: number, back: boolean = false, shiny: boolean = false): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${back ? "back/" : ""}${
        shiny ? "shiny/" : ""
    }${id}.png`;
}
