export interface PokemonResponce {
  base_experience: number;
  name: string;
  order: number;
  id: number;
  sprites: {
    front_default: string;
  };
  abilities: {
    is_hidden: boolean;
    slot: number;
    ability: {
      name: string;
      url: string;
    };
  }[];
}
