export interface PokemonAbility {
  effect_changes: {}[];
  effect_entries: {
    effect: string;
    language: {
      name: string;
      url: string;
    };
  }[];
  id: number;
  is_main_series: boolean;
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
}

export interface ShortAbility {
  effect_entries: {
    effect: string;
    language: {
      name: string;
      url: string;
    };
  }[];
  name: string;
}
export interface Ability {
  effect_entries: {
    effect?: string;
    name: string;
    discription: string;
  }[];
  name: string;
}
