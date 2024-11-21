import { EvolutionChain, EvolutionDetail } from "./evo/evolution.schema";
import { NamedResource } from "./pkmn.schema";
import {
    ChartableStat,
    EvolutionMethod,
    Move,
    MoveAtLevel,
    MovesByVersion,
    PkmnMoveMethod,
    PkmnType,
    PkmnVersion,
    Stat,
    StatName,
} from "./pkmn.types";

export function statArrayToChartable(stats: Stat[]): ChartableStat[] {
    const chartable = stats.map(({ base_stat, stat }) => ({
        name: stat.name.replace("-", " ").toUpperCase(),
        base: base_stat,
    }));

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

export function typeNameToDisplay(type?: PkmnType): string {
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

export function typeNameToColor(type?: PkmnType): { border: string; background: string; text: string } {
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

export function versionNameToDisplay(version: PkmnVersion | string): string {
    switch (version) {
        case "red-blue":
            return "Red & Blue";
        case "yellow":
            return "Yellow";
        case "gold-silver":
            return "Gold & Silver";
        case "crystal":
            return "Crystal";
        case "ruby-sapphire":
            return "Ruby & Sapphire";
        case "emerald":
            return "Emerald";
        case "firered-leafgreen":
            return "Firered & Leafgreen";
        case "diamond-pearl":
            return "Diamond & Pearl";
        case "platinum":
            return "Platinum";
        case "heartgold-soulsilver":
            return "Heartgold & Soulsilver";
        case "black-white":
            return "Black & White";
        case "colosseum":
            return "Colosseum";
        case "xd":
            return "XD: Gale of Darkness";
        case "black-2-white-2":
            return "Black 2 & White 2";
        case "x-y":
            return "X & Y";
        case "omega-ruby-alpha-sapphire":
            return "Omega Ruby & Alpha Sapphire";
        case "sun-moon":
            return "Sun & Moon";
        case "ultra-sun-ultra-moon":
            return "Ultra Sun & Ultra Moon";
        case "lets-go-pikachu-lets-go-eevee":
            return "Let's Go Pikachu & Let's Go Eevee";
        case "sword-shield":
            return "Sword & Shield";
        case "the-isle-of-armor":
            return "SWSH: The Isle of Armor";
        case "the-crown-tundra":
            return "SWSH: The Crown Tundra";
        case "brilliant-diamond-and-shining-pearl":
            return "Brilliand Diamond & Shining Pearl";
        case "legends-arceus":
            return "Legends Arceus";
        case "scarlet-violet":
            return "Scarlet & Violet";
        case "the-teal-mask":
            return "SV: The Teal Mask";
        case "the-indigo-disk":
            return "SV: The Indigo Disk";
        default:
            return "Unknown Version";
    }
}

export function movesListByVersion(moves: Move[]): MovesByVersion {
    const versionsSet: MovesByVersion = {};

    for (const move of moves) {
        for (const versionGroupDetails of move.version_group_details) {
            const versionName: string = versionGroupDetails.version_group.name;

            const moveSet = versionsSet[versionName] ?? [];

            const moveData: MoveAtLevel = {
                move: move.move,
                level: versionGroupDetails.level_learned_at,
                method: versionGroupDetails.move_learn_method,
            };

            moveSet.push(moveData);

            versionsSet[versionName] = moveSet;
        }
    }
    return versionsSet;
}

export function formatName(name: string | undefined, caps: boolean = false): string {
    return (name ?? "???").replaceAll("-", " ").toUpperCase();
}

export function moveMethodToDisplay(method: PkmnMoveMethod) {
    switch (method) {
        case "level-up":
            return "Level Up";
        case "egg":
            return "Egg";
        case "tutor":
            return "Tutor";
        case "machine":
            return "TM/HM";
        case "stadium-surfing-pikachu":
            return "Surfing Pikachu";
        case "light-ball-egg":
            return "Light Ball Egg";
        case "colosseum-purification":
            return "Colosseum Purification";
        case "xd-shadow":
            return "XD Shadow Move";
        case "xd-purification":
            return "XD Purification";
        case "form-change":
            return "Form Change";
        case "zygarde-cube":
            return "Zygarde Cube";
    }
}

export function evolutionMethodToDisplay(detail: EvolutionDetail, pkmnName: string) {
    switch (detail.trigger.name) {
        case "level-up":
            const reqs = [];

            if (detail.gender) {
                reqs.push(`as gender ${detail.gender}`);
            }
            if (detail.location) {
                reqs.push(`at ${formatName(detail.location.name)}`);
            }
            if (detail.min_affection) {
                reqs.push(`with ${detail.min_affection} affection`);
            }
            if (detail.min_beauty) {
                reqs.push(`with ${detail.min_beauty} beauty`);
            }
            if (detail.min_happiness) {
                reqs.push(`with ${detail.min_happiness} happiness`);
            }
            if (detail.needs_overworld_rain) {
                reqs.push(`while raining`);
            }
            if (detail.party_species) {
                reqs.push(`while party contains ${formatName(detail.party_species.name)}`);
            }
            if (detail.party_type) {
                reqs.push(`with party type ${detail.party_type.name}`);
            }
            if (detail.relative_physical_stats) {
                reqs.push(`with stats at ${detail.relative_physical_stats}`);
            }
            if (detail.time_of_day) {
                reqs.push(`at ${detail.time_of_day}`);
            }
            if (detail.trade_species) {
                reqs.push(`trade species ${detail.trade_species}`);
            }
            if (detail.turn_upside_down) {
                reqs.push(`turn upside down`);
            }
            return `level ${detail.min_level ? detail.min_level : "up"} ${reqs.join(", ")}`;
        case "trade":
            return `trade holding ${formatName(detail.held_item?.name)}`;
        case "use-item":
            return `use ${formatName(detail.item?.name)}`;
        case "shed":
            return "sheds into";
        case "spin":
            return "spin into";
        case "tower-of-darkness":
        case "tower-of-waters":
        case "three-critical-hits":
            return formatName(detail.trigger.name);
        case "take-damage":
            return;
        case "other":
            switch (pkmnName) {
                case "pawmot":
                case "brambleghast":
                case "rabsca":
                    return "level up outside of its Pokê Ball after walking 1,000 steps using the Let's Go! feature";
                case "maushold":
                    return "level 25, 99% chance of being family of 4";
                case "palafin":
                    return "level 38 while in a Union Circle group";
                case "annihilape":
                    return "level up after using Rage Fist 20 times";
                case "kingambit":
                    return "level up after defeating 3 bisharp that hold a Leader's Crest";
                case "gholdengo":
                    return "level up with 999 Gimmighoul Coins in the Bag";
            }
        case "agile-style-move":
        case "strong-style-move":
            return `use ${formatName(detail.known_move?.name)} 20 times`;
        case "recoil-damage":
            return "take 294 recoil damage";
        default:
            return "";
    }
}

export type EvolutionBreakdown = {
    species: string;
    techniques: string[] | undefined;
    or?: boolean;
};

export function evolutionBreakdown(
    evolutions: Record<string, EvolutionDetail[]>,
    grouping: string = ""
): EvolutionBreakdown[] {
    const computed = [];

    const orSet = new Set<string>();

    console.log({ grouping });
    const groupings = grouping.split(",").map((thenGroup) => {
        const orGroup = thenGroup.split("|");
        if (orGroup.length === 1) {
            return thenGroup[0];
        }

        return orGroup;
    });

    for (const group of groupings) {
        if (Array.isArray(group)) {
            group.forEach((or) => {
                orSet.add(or);
            });
        }
    }

    const entries = Object.entries(evolutions) as [string, EvolutionDetail[]][];

    for (let i = 0; i < entries.length; i++) {
        const [pkmn, details] = entries[i];

        const val: EvolutionBreakdown = {
            species: pkmn,
            techniques: details.map((d) => evolutionMethodToDisplay(d, pkmn) ?? ""),
            or: orSet.has(pkmn),
        };

        computed.push(val);
    }

    return computed;
}
