export interface PokemonListItem {
  name: string;
  url: string;
  sprites?: {
    back_default: string;
    back_shiny: string;
    front_default: string;
    front_shiny: string;
  };
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonCharacteristic {
  id: number;
  gene_modulo: number;

  highest_stat: {
    name: string;
    url: string;
  };
  descriptions: {
    description: string;
    language: {
      name: string;
      url: string;
    };
  }[];
}
export interface ItemList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Item[];
}

export interface Item {
  name: string;
  url: string;
}
export interface ItemDetails {
  effect_entries: {
    effect: string;
    short_effect: string;
    language: {
      name: string;
      url: string;
    };
  }[];

  attributes: {
    name: string;
    url: string;
  }[];
  category: {
    name: string;
    url: string;
  };
}

export interface PokemonShortData {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;

  abilities: {
    ability: {
      name: string;
      url: string;
    };
  }[];

  forms: {
    name: string;
    url: string;
  }[];
  moves: {
    move: {
      name: string;
      url: string;
    };
  }[];

  sprites: {
    back_default: string;
    back_shiny: string;
    front_default: string;
    front_shiny: string;
  };
  home: {
    front_default: string;
    front_shiny: string;
  };
}

export interface ItemAttributes {
  id: number;
  name: string;
  descriptions: {
    description: string;
    language: {
      name: string;
      url: string;
    };
  }[];
  items: {
    name: string;
    url: string;
  }[];
  names: {
    name: string;
    language: {
      name: string;
      url: string;
    };
  }[];
}

export interface ItemCategory {
  id: number;
  name: string;
  items: {
    name: string;
    url: string;
  }[];
  names: {
    name: string;
    language: {
      name: string;
      url: string;
    };
  }[];
  pocket: {
    name: string;
    url: string;
  };
}

export interface ItemFlingEfect {
  id: number;
  name: string;
  effect_entries: {
    effect: string;
    language: {
      name: string;
      url: string;
    };
  }[];
  items: {
    name: string;
    url: string;
  }[];
}
