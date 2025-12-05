export interface PokemonHabitats {
  id: number;
  name: string;
  base_happiness: number;
  capture_rate: number;
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
      url: string;
    };
  }[];
}
export interface HabitatsList {
  results: {
    name: string;
    url: string;
  }[];
}
export interface Habitat {
  results: {
    name: string;
    url: string;
  }[];
}
