
import { useQuery } from '@tanstack/react-query';

interface WalletDistributionItem {
  name: string;
  value: number;
}

export const useWalletDistribution = () => {
  return useQuery({
    queryKey: ['walletDistribution'],
    queryFn: async (): Promise<WalletDistributionItem[]> => {
      // In the future, replace with actual API call to token terminal or blockchain explorer
      console.log('Fetching wallet distribution data...');
      
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { name: 'Top 10 Wallets', value: 420000000 },
            { name: 'Top 11-50', value: 180000000 },
            { name: 'Top 51-100', value: 95000000 },
            { name: 'Top 101-500', value: 124000000 },
            { name: 'Other Wallets', value: 181000000 },
          ]);
        }, 1500);
      });
    },
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};
