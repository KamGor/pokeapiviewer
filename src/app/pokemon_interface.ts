export interface Pokemono {
  id: number;
  name: string;
  abilities: {
    name: string;
    isHidden: boolean;
    description: string;
  }[];
  imgSrc?: string;
}
