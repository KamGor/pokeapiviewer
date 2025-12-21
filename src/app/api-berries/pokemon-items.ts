export interface pokemonItem {
  effect_entries: {
    effect: string;
    short_effect: string;
    language: {
      name: string;
      url: string;
    };
  }[];
  sprites: {
    default: string;
  };
}
