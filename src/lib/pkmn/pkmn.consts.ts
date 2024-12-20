import { EvolutionMethod, PkmnMoveMethod, PkmnType, PkmnVersion } from "./pkmn.types";

export const TYPE_NAMES: PkmnType[] = [
    "normal",
    "fighting",
    "flying",
    "poison",
    "ground",
    "rock",
    "bug",
    "ghost",
    "steel",
    "fire",
    "water",
    "grass",
    "electric",
    "psychic",
    "ice",
    "dragon",
    "dark",
    "fairy",
    "stellar",
    "unknown",
];

export const VERSION_NAMES: PkmnVersion[] = [
    "red-blue",
    "yellow",
    "gold-silver",
    "crystal",
    "ruby-sapphire",
    "emerald",
    "firered-leafgreen",
    "diamond-pearl",
    "platinum",
    "heartgold-soulsilver",
    "black-white",
    "colosseum",
    "xd",
    "black-2-white-2",
    "x-y",
    "omega-ruby-alpha-sapphire",
    "sun-moon",
    "ultra-sun-ultra-moon",
    "lets-go-pikachu-lets-go-eevee",
    "sword-shield",
    "the-isle-of-armor",
    "the-crown-tundra",
    "brilliant-diamond-and-shining-pearl",
    "legends-arceus",
    "scarlet-violet",
    "the-teal-mask",
    "the-indigo-disk",
];

export const MOVE_METHODS: PkmnMoveMethod[] = [
    "level-up",
    "egg",
    "tutor",
    "machine",
    "stadium-surfing-pikachu",
    "light-ball-egg",
    "colosseum-purification",
    "xd-shadow",
    "xd-purification",
    "form-change",
    "zygarde-cube",
];

export const EVOLUTION_METHODS: EvolutionMethod[] = [
    "level-up",
    "trade",
    "use-item",
    "shed",
    "spin",
    "tower-of-darkness",
    "tower-of-waters",
    "three-critical-hits",
    "take-damage",
    "other",
    "agile-style-move",
    "strong-style-move",
    "recoil-damage",
];
