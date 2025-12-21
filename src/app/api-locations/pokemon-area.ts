export interface PokemonAreaResponse {
  name: string;
  id: number;
  game_index: number;
  location: {
    name: string;
    url: string;
  };
}
