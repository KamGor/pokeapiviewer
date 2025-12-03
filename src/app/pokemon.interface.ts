export interface Pokemon {
  id: number;
  name: string;
  abilities: {
    name: string;
    description: string;
    isHidden: boolean;
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
