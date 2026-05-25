export interface PokemonAnswer {
  id: number;
  name: string;
  weight: number;
  height: number;

  stats: {
    effort: number;
    base_stat: number;
    stat: {
      name: string;
    };
  }[];

  species: {
    name: string;
    url: string;
  };

  abilities: {
    is_hidden: boolean;
    slot: number;
    ability: {
      name: string;
      url: string;
    };
  }[];

  types?: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];

  cries: {
    latest: string;
    legacy: string;
  };
  past_abilities?: {
    generation: {
      name: string;
      url: string;
    };
  }[];

  forms: {
    name: string;
    url: string;
  }[];

  sprites: {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
  };

  moves: {
    move: {
      name: string;
      url: string;
    };
  }[];
}
