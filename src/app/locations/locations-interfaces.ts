export interface LocationsListItem {
  name: string;
  url: string;
}

export interface LocationsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: LocationsListItem[];
}

export interface AreasDetails {
  name: string;
  url: string;
}

export interface LocationsDetails {
  id: number;
  region: {
    name: string;
  };
  name: string | null;
  areas: AreasDetails[];
}

export interface locationAreas {
  id: number;
  name: string;
  pokemon_encounters: {
    pokemon: {
      name: string;
    };
  }[];
}
