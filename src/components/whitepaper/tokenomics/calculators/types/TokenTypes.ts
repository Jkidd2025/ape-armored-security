
export interface TokenMetrics {
  tokenAmount: number;
  tokenPrice: number;
  marketCap: number;
  fdv: number; // Fully Diluted Valuation
  liquidityPool: number;
}

export interface ChartPredictorMiniProps {
  initialTokenAmount?: number;
  initialTokenPrice?: number;
  priceAppreciation?: number;
}

export const initialMetrics: TokenMetrics = {
  tokenAmount: 1000,
  tokenPrice: 0.1,
  marketCap: 10000000, // $10M
  fdv: 100000000, // $100M
  liquidityPool: 1000000, // $1M
};
