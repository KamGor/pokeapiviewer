export interface BerriesPrivate {
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
export interface BerriesListItem {
  name: string;
  url: string;
}
