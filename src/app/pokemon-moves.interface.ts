export interface pokemonMoves {
  accuracy: number;
  contest_combos: null;
  contest_effect: null;
  contest_type: null;
  damage_class: {
    name: string;
    url: string;
  };
  effect_chance: number;
  effect_changes: unknown[];
  effect_entries: {
    effect: string;
    language: {
      name: string;
      url: string;
    };
    short_effect: string;
  }[];
  name: string;
  id: number;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
}
