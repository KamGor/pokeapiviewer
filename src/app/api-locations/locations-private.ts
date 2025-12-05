export interface LocationsPrivate {
  id: number;
  name: string;
  game_index: number;

  pokemonAreas: {
    name: string;
    id: number;
    locationName: string;
  };
}
