export interface PrivateHabitats {
  id: number;
  name: string;

  pokemonSpecies: {
    baseHappiness: number;
    captureRate: number;
    flavorText: string;
  }[];
}
