import type { Coin } from '../types';

function generatePriceHistory(basePrice: number, days = 30): { time: string; price: number }[] {
  const points = [];
  let price = basePrice * 0.6;
  const now = new Date();
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    price = price * (1 + (Math.random() - 0.48) * 0.12);
    points.push({
      time: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: parseFloat(price.toFixed(6)),
    });
  }
  return points;
}

function generateVolumeHistory(baseVolume: number, days = 30): { time: string; volume: number }[] {
  const points = [];
  const now = new Date();
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    points.push({
      time: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      volume: Math.floor(baseVolume * (0.5 + Math.random())),
    });
  }
  return points;
}

export const mockCoins: Coin[] = [
  {
    id: 'solaris-x',
    name: 'Solaris X',
    ticker: 'SLRX',
    price: 0.004821,
    priceChange24h: 12.4,
    volume24h: 2_840_000,
    liquidity: 1_200_000,
    holders: 8_420,
    volatility: 22,
    happyScore: 87,
    marketCap: 4_821_000,
    launchDate: '2024-11-12',
    description:
      'Solaris X is a high-performance DeFi token built on Solana, focusing on cross-chain liquidity aggregation and yield optimization.',
    scoreBreakdown: { liquidity: 90, volume: 88, holders: 82, volatility: 85, momentum: 91 },
    priceHistory: generatePriceHistory(0.004821),
    volumeHistory: generateVolumeHistory(2_840_000),
  },
  {
    id: 'nova-pulse',
    name: 'Nova Pulse',
    ticker: 'NVPL',
    price: 0.001337,
    priceChange24h: -4.2,
    volume24h: 980_000,
    liquidity: 450_000,
    holders: 3_210,
    volatility: 51,
    happyScore: 61,
    marketCap: 1_337_000,
    launchDate: '2024-12-03',
    description:
      'Nova Pulse is a community-driven token with real-time on-chain analytics and automated buyback mechanisms.',
    scoreBreakdown: { liquidity: 55, volume: 62, holders: 58, volatility: 45, momentum: 68 },
    priceHistory: generatePriceHistory(0.001337),
    volumeHistory: generateVolumeHistory(980_000),
  },
  {
    id: 'quantum-flow',
    name: 'Quantum Flow',
    ticker: 'QFLOW',
    price: 0.02341,
    priceChange24h: 28.7,
    volume24h: 5_600_000,
    liquidity: 3_100_000,
    holders: 14_800,
    volatility: 38,
    happyScore: 92,
    marketCap: 23_410_000,
    launchDate: '2024-10-20',
    description:
      "Quantum Flow leverages Solana's speed for institutional-grade token swapping with sub-second finality and MEV protection.",
    scoreBreakdown: { liquidity: 95, volume: 94, holders: 93, volatility: 78, momentum: 96 },
    priceHistory: generatePriceHistory(0.02341),
    volumeHistory: generateVolumeHistory(5_600_000),
  },
  {
    id: 'vortex-dao',
    name: 'Vortex DAO',
    ticker: 'VTX',
    price: 0.000421,
    priceChange24h: -18.3,
    volume24h: 210_000,
    liquidity: 88_000,
    holders: 920,
    volatility: 79,
    happyScore: 24,
    marketCap: 421_000,
    launchDate: '2025-01-15',
    description:
      'Vortex DAO is a governance token for a decentralized autonomous organization targeting micro-cap yield strategies.',
    scoreBreakdown: { liquidity: 20, volume: 22, holders: 18, volatility: 15, momentum: 28 },
    priceHistory: generatePriceHistory(0.000421),
    volumeHistory: generateVolumeHistory(210_000),
  },
  {
    id: 'apex-chain',
    name: 'Apex Chain',
    ticker: 'APEX',
    price: 0.008910,
    priceChange24h: 5.1,
    volume24h: 1_750_000,
    liquidity: 890_000,
    holders: 6_540,
    volatility: 29,
    happyScore: 78,
    marketCap: 8_910_000,
    launchDate: '2024-11-28',
    description:
      'Apex Chain bridges Solana with EVM ecosystems, enabling frictionless asset transfer and unified liquidity pools.',
    scoreBreakdown: { liquidity: 80, volume: 76, holders: 78, volatility: 75, momentum: 80 },
    priceHistory: generatePriceHistory(0.00891),
    volumeHistory: generateVolumeHistory(1_750_000),
  },
  {
    id: 'drift-protocol',
    name: 'Drift Protocol',
    ticker: 'DRFT',
    price: 0.0553,
    priceChange24h: -2.8,
    volume24h: 3_200_000,
    liquidity: 2_400_000,
    holders: 11_200,
    volatility: 18,
    happyScore: 84,
    marketCap: 55_300_000,
    launchDate: '2024-09-10',
    description:
      "Drift Protocol offers perpetual futures and spot trading with deep liquidity on Solana's native DEX infrastructure.",
    scoreBreakdown: { liquidity: 88, volume: 85, holders: 87, volatility: 88, momentum: 72 },
    priceHistory: generatePriceHistory(0.0553),
    volumeHistory: generateVolumeHistory(3_200_000),
  },
  {
    id: 'zeta-spark',
    name: 'Zeta Spark',
    ticker: 'ZTSP',
    price: 0.000072,
    priceChange24h: -41.2,
    volume24h: 55_000,
    liquidity: 18_000,
    holders: 340,
    volatility: 94,
    happyScore: 11,
    marketCap: 72_000,
    launchDate: '2025-02-01',
    description:
      'Zeta Spark is an experimental micro-cap token in early discovery phase with high speculative risk and low liquidity.',
    scoreBreakdown: { liquidity: 8, volume: 10, holders: 6, volatility: 5, momentum: 12 },
    priceHistory: generatePriceHistory(0.000072),
    volumeHistory: generateVolumeHistory(55_000),
  },
  {
    id: 'lumina-fi',
    name: 'Lumina Fi',
    ticker: 'LMFI',
    price: 0.01124,
    priceChange24h: 9.3,
    volume24h: 2_100_000,
    liquidity: 1_500_000,
    holders: 9_800,
    volatility: 25,
    happyScore: 81,
    marketCap: 11_240_000,
    launchDate: '2024-10-05',
    description:
      'Lumina Fi provides on-chain lending and borrowing with algorithmic interest rate models and risk-adjusted collateral.',
    scoreBreakdown: { liquidity: 84, volume: 82, holders: 80, volatility: 83, momentum: 78 },
    priceHistory: generatePriceHistory(0.01124),
    volumeHistory: generateVolumeHistory(2_100_000),
  },
  {
    id: 'phantom-rise',
    name: 'Phantom Rise',
    ticker: 'PHMR',
    price: 0.003340,
    priceChange24h: 67.8,
    volume24h: 4_900_000,
    liquidity: 620_000,
    holders: 4_100,
    volatility: 88,
    happyScore: 49,
    marketCap: 3_340_000,
    launchDate: '2025-01-28',
    description:
      'Phantom Rise is a newly launched speculation token experiencing high volatility due to social media momentum and low liquidity depth.',
    scoreBreakdown: { liquidity: 35, volume: 72, holders: 42, volatility: 18, momentum: 85 },
    priceHistory: generatePriceHistory(0.00334),
    volumeHistory: generateVolumeHistory(4_900_000),
  },
  {
    id: 'stellar-arc',
    name: 'Stellar Arc',
    ticker: 'SARC',
    price: 0.00788,
    priceChange24h: 1.2,
    volume24h: 870_000,
    liquidity: 710_000,
    holders: 5_600,
    volatility: 14,
    happyScore: 72,
    marketCap: 7_880_000,
    launchDate: '2024-10-18',
    description:
      'Stellar Arc focuses on stable, low-volatility accumulation backed by protocol-owned liquidity and consistent buybacks.',
    scoreBreakdown: { liquidity: 76, volume: 65, holders: 74, volatility: 92, momentum: 58 },
    priceHistory: generatePriceHistory(0.00788),
    volumeHistory: generateVolumeHistory(870_000),
  },
];
