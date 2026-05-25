export interface Pokemon {
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

  species?: {
    description: string;
  }[];

  abilities?: {
    name: string;
    description: string;
    isHidden?: boolean;
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

  imgSrc?: string;
  imgSprite?: string;
  imgSpriteBack?: string;

  forms?: {
    name: string;
    backDefault: string;
    frontDefault: string;
  }[];

  moves?: {
    name: string;
    description: string;
    id: number;
  }[];
}

export interface PokemonList {
  name: string;
  url: string;
}

export interface FilteredPokemonList {
  name: string;
  url: string;
  data: Pokemon;
}

export interface PokemonImage {
  cries: {
    latest: string;
    legacy: string;
  };
  name: string;
  id: number;
  sprites: {
    back_default?: string;
    back_shiny: string;
    front_default: string;
    front_shiny: string;
  };
}

export interface PokemonImageNew {
  cries: {
    latest: string;
    legacy: string;
  };
  name: string;
  images: {
    url: string | undefined;
  }[];
}
