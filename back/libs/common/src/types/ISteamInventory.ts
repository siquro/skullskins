export interface ISteamInventory {
  assets: Asset[];
  descriptions: Description[];
  total_inventory_count: number;
  success: number;
  rwgrsn: number;
}

export interface Asset {
  appid: number;
  contextid: string;
  assetid: string;
  classid: string;
  instanceid: string;
  amount: string;
}

export interface Description {
  appid: number;
  classid: string;
  instanceid: string;
  currency: number;
  background_color: string;
  icon_url: string;
  icon_url_large: string;
  descriptions: Description2[];
  tradable: number;
  actions?: Action[];
  name: string;
  name_color: string;
  type: string;
  market_name: string;
  market_hash_name: string;
  market_actions?: MarketAction[];
  commodity: number;
  market_tradable_restriction: number;
  marketable: number;
  tags: Tag[];
}

export interface Description2 {
  type: string;
  value: string;
  color?: string;
}

export interface Action {
  link: string;
  name: string;
}

export interface MarketAction {
  link: string;
  name: string;
}

export interface Tag {
  category: string;
  internal_name: string;
  localized_category_name: string;
  localized_tag_name: string;
  color?: string;
}
