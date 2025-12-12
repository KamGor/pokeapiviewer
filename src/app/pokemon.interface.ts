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
    // flavor_text: string;
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
