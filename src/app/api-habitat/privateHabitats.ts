export interface PrivateHabitat {
  id: number;
  name: string;
  pokemonSpecies: {
    id: number;
    name: string;
    baseHappiness: number;
    captureRate: number;
    flavorText: { flavorText: string }[];
  }[];
}
