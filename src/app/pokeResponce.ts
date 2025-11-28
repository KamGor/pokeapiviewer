export interface pokemonAnswer {
  id: number;
  name: string;
  abilities: {
    is_hidden: boolean;
    slot: number;
    ability: {
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

  // habitats: {
  //   id: number;
  //   name: string;
  //   names: {
  //     name: string;
  //     language: {
  //       name: string;
  //       url: string;
  //     };
  //   };
  // pokemon_species: {
  //   name: string;
  //   url: string;
  // };
}
