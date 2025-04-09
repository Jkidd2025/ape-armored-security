
import { TokenMetrics } from "./ChartPredictorForm";

export const formatNumberWithCommas = (num: number): string => {
  return num.toLocaleString('en-US', { maximumFractionDigits: 2 });
};

export const calculateTokenStats = (metrics: TokenMetrics) => {
  // Calculating circulating supply based on market cap and price
  const circulatingSupply = metrics.marketCap / metrics.tokenPrice;
  
  // Calculate percentage of supply the user owns
  const percentOfSupply = (metrics.tokenAmount / circulatingSupply) * 100;
  
  // Calculate LP to market cap ratio (higher is better for liquidity)
  const lpToMarketCapRatio = (metrics.liquidityPool / metrics.marketCap) * 100;
  
  // Determine slippage impact based on LP size relative to market cap
  let slippageImpact = "High";
  if (lpToMarketCapRatio >= 15) {
    slippageImpact = "Low";
  } else if (lpToMarketCapRatio >= 5) {
    slippageImpact = "Medium";
  }
  
  // Calculate token velocity (simplified approximation)
  const tokenVelocity = metrics.fdv / metrics.marketCap;
  
  return {
    circulatingSupply,
    percentOfSupply,
    lpToMarketCapRatio,
    slippageImpact,
    tokenVelocity
  };
};
