
import { useQuery } from '@tanstack/react-query';

interface LiquidityPool {
  pair: string;
  exchange: string;
  apeLocked: number;
  totalValueLocked: number;
  volume24h: number;
  apr: number;
}

export const useLiquidityPools = () => {
  return useQuery({
    queryKey: ['liquidityPools'],
    queryFn: async (): Promise<LiquidityPool[]> => {
      // In the future, replace with actual API call to token terminal or DEX APIs
      console.log('Fetching liquidity pools data...');
      
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              pair: "APE-SOL",
              exchange: "Raydium",
              apeLocked: 125000000,
              totalValueLocked: 187500,
              volume24h: 45700,
              apr: 12.4,
            },
            {
              pair: "APE-USDC",
              exchange: "Orca",
              apeLocked: 85000000,
              totalValueLocked: 63750,
              volume24h: 28900,
              apr: 8.6,
            },
            {
              pair: "APE-USDT",
              exchange: "Jupiter",
              apeLocked: 45000000,
              totalValueLocked: 33750,
              volume24h: 15300,
              apr: 7.2,
            },
            {
              pair: "APE-RAY",
              exchange: "Raydium",
              apeLocked: 20450000,
              totalValueLocked: 15337,
              volume24h: 6200,
              apr: 9.8,
            },
          ]);
        }, 1500);
      });
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
