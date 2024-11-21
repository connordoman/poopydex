interface NamedResource {
    name: string;
    url: string;
}

interface FlavorTextEntry {
    flavor_text: string;
    language: NamedResource;
    version: NamedResource;
}

interface FormDescription {
    description: string;
    language: NamedResource;
}

interface Genera {
    genus: string;
    language: NamedResource;
}

interface Name {
    name: string;
    language: NamedResource;
}

interface PalParkEncounterArea {
    base_score: number;
    rate: number;
    area: NamedResource;
}

interface PokedexNumber {
    entry_number: number;
    pokedex: NamedResource;
}

interface Variety {
    is_default: boolean;
    pokemon: NamedResource;
}

interface PokemonSpecies {
    base_happiness: number;
    capture_rate: number;
    color: NamedResource;
    egg_groups: NamedResource[];
    evolution_chain: { url: string };
    evolves_from_species: NamedResource | null;
    flavor_text_entries: FlavorTextEntry[];
    form_descriptions: FormDescription[];
    forms_switchable: boolean;
    gender_rate: number;
    genera: Genera[];
    generation: NamedResource;
    growth_rate: NamedResource;
    habitat: NamedResource | null;
    has_gender_differences: boolean;
    hatch_counter: number;
    id: number;
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    name: string;
    names: Name[];
    order: number;
    pal_park_encounters: PalParkEncounterArea[];
    pokedex_numbers: PokedexNumber[];
    shape: NamedResource | null;
    varieties: Variety[];
}

export type {
    PokemonSpecies,
    NamedResource,
    FlavorTextEntry,
    FormDescription,
    Genera,
    Name,
    PalParkEncounterArea,
    PokedexNumber,
    Variety,
};
