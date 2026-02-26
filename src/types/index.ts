export interface Coin {
  id: string;
  name: string;
  ticker: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  liquidity: number;
  holders: number;
  volatility: number;
  happyScore: number;
  marketCap: number;
  launchDate: string;
  description: string;
  scoreBreakdown: ScoreBreakdown;
  priceHistory: PricePoint[];
  volumeHistory: VolumePoint[];
}

export interface ScoreBreakdown {
  liquidity: number;
  volume: number;
  holders: number;
  volatility: number;
  momentum: number;
}

export interface PricePoint {
  time: string;
  price: number;
}

export interface VolumePoint {
  time: string;
  volume: number;
}

export type SortField =
  | 'name'
  | 'price'
  | 'priceChange24h'
  | 'volume24h'
  | 'liquidity'
  | 'holders'
  | 'volatility'
  | 'happyScore';

export type SortDirection = 'asc' | 'desc';

export type RiskBand = 'high' | 'medium' | 'low' | 'critical';
