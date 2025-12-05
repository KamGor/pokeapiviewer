export interface LocationResponce {
  id: number;
  name: string;

  areas: {
    name: string;
    url: string;
  }[];
}
