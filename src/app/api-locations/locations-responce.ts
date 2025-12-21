export interface LocationResponse {
  id: number;
  name: string;

  areas: {
    name: string;
    url: string;
  }[];
}
