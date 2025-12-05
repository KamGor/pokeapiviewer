export interface berriesPrivate {
  id: number;
  name: string;
  growthTime: number;
  maxHarvest: number;
  naturalGiftPower: number;
  size: number;
  smoothness: number;
  soilDryness: number;
  item: {
    imgSprite: string;
    description: string;
    excerpt: string;
  }[];
}
