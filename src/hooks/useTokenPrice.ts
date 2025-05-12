
import { useQuery } from '@tanstack/react-query';

interface TokenPriceData {
  price: number;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
  updatedAt: string;
}

export const useTokenPrice = () => {
  return useQuery({
    queryKey: ['tokenPrice'],
    queryFn: async (): Promise<TokenPriceData> => {
      // In the future, replace with actual API call to token terminal or your backend
      console.log('Fetching token price data...');
      
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            price: 0.00075,
            priceChange24h: 2.3,
            volume24h: 24563,
            marketCap: 748100,
            updatedAt: new Date().toISOString(),
          });
        }, 1500);
      });
    },
    staleTime: 30 * 1000, // 30 seconds for price data
    refetchInterval: 30 * 1000, // refresh every 30 seconds
  });
};
