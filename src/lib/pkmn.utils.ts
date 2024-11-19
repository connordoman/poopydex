import { ChartableStat, PkmnType, Stat, StatName } from "./pkmn.types";

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

    console.log("simplifying stat:", statName);

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

export function typeNameToDisplay(type: PkmnType): string {
    console.log("displaying", type);

    switch (type) {
        case "normal":
            return "Normal";
        case "fighting":
            return "Fighting";
        case "flying":
            return "Flying";
        case "poison":
            return "Poison";
        case "ground":
            return "Ground";
        case "rock":
            return "Rock";
        case "bug":
            return "Bug";
        case "ghost":
            return "Ghost";
        case "steel":
            return "Steel";
        case "fire":
            return "Fire";
        case "water":
            return "Water";
        case "grass":
            return "Grass";
        case "electric":
            return "Electric";
        case "psychic":
            return "Psychic";
        case "ice":
            return "Ice";
        case "dragon":
            return "Dragon";
        case "dark":
            return "Dark";
        case "fairy":
            return "Fairy";
        case "stellar":
            return "Stellar";
        case "unknown":
        default:
            return "???";
    }
}

export function typeNameToColor(type: PkmnType): { border: string; background: string; text: string } {
    switch (type) {
        case "normal":
            return { border: "", background: "#a8a878", text: "" };
        case "fighting":
            return { border: "", background: "#ef4444", text: "" };
        case "flying":
            return { border: "", background: "#7dd3fc", text: "" };
        case "poison":
            return { border: "", background: "#a855f7", text: "" };
        case "ground":
            return { border: "", background: "#b45309", text: "" };
        case "rock":
            return { border: "", background: "#713f12", text: "" };
        case "bug":
            return { border: "", background: "#84cc16", text: "" };
        case "ghost":
            return { border: "", background: "#6366f1", text: "" };
        case "steel":
            return { border: "", background: "#71717a", text: "" };
        case "fire":
            return { border: "", background: "#f97316", text: "" };
        case "water":
            return { border: "", background: "#3b82f6", text: "" };
        case "grass":
            return { border: "", background: "#22c55e", text: "" };
        case "electric":
            return { border: "", background: "#fde047", text: "" };
        case "psychic":
            return { border: "", background: "#ec4899", text: "" };
        case "ice":
            return { border: "", background: "#0ea5e9", text: "" };
        case "dragon":
            return { border: "", background: "#4338ca", text: "" };
        case "dark":
            return { border: "", background: "#27272a", text: "" };
        case "fairy":
            return { border: "", background: "#f5d0fe", text: "" };
        case "stellar":
            return { border: "", background: "#14b8a6", text: "" };
        case "unknown":
        default:
            return { border: "", background: "#10b981", text: "" };
    }
}
