export interface ResponseHabitats {
  id: number;
  name: string;
  base_happiness: number;
  capture_rate: number;
  flavor_text_entries: {
    flavorText: string;
    language: {
      name: string;
    };
  }[];

  pokemon_species: {
    name: string;
    url: string;
  }[];
}
export interface ResponseHabitatsList {
  results: {
    name: string;
    url: string;
  }[];
}
export interface ResponseHabitatData {
  results: {
    id: number;
    name: string;
    pokemon_species: {
      name: string;
    }[];
  }[];
}
