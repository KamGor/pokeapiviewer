export interface privateHabitats {
  id: number;
  name: string;

  pokemonSpecies: {
    baseHappiness: number;
    captureRate: number;
    flavorText: string;
  }[];
}
