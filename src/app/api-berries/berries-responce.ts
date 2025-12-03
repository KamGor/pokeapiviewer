export interface berriesResponce {
  id: number;
  name: string;
  growth_time: number;
  max_harvest: number;
  natural_gift_power: number;
  size: number;
  smoothness: number;
  soil_dryness: number;
  item: {
    name: string;
    url: string;
  }[];
}
