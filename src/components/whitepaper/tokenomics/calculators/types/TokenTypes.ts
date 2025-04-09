
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
  tokenAmount: 1000, // Keep default
  tokenPrice: 0.00019065, // From Presale Round 3 (Liquidity Token Price)
  marketCap: 190650, // From Presale Round 3 (FDV)
  fdv: 190650, // From Presale Round 3 (FDV = $190,650)
  liquidityPool: 9532.50, // From Liquidity Pool 1 (Estimated Liquidity = $9,532.50)
};
