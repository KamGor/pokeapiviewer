export interface ResponseHabitats {
  id: number;
  name: string;
  names: {
    name: string;
    language: {
      name: string;
      url: string;
    };
  }[];

  pokemon_species: {
    name: string;
    url: string;
  }[];
}
