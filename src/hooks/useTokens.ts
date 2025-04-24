
import { useQuery } from '@tanstack/react-query';
import { getTokenList, getTokenPrice, TokenInfo } from '@/services/solanaTracker';
import { useToast } from '@/components/ui/use-toast';

export function useTokenList() {
  return useQuery({
    queryKey: ['tokenList'],
    queryFn: getTokenList,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
}

export function useTokenPrice(mintAddress: string | undefined) {
  return useQuery({
    queryKey: ['tokenPrice', mintAddress],
    queryFn: () => mintAddress ? getTokenPrice(mintAddress) : null,
    enabled: !!mintAddress,
    refetchInterval: 30000, // Refetch every 30 seconds
    retry: 3,
  });
}

export function useTokensWithPrices() {
  const { toast } = useToast();
  
  const { data: tokens, isLoading: isLoadingTokens, error, refetch } = useTokenList();
  
  const tokensWithPrices = useQuery({
    queryKey: ['tokensWithPrices', tokens],
    queryFn: async () => {
      if (!tokens || tokens.length === 0) {
        throw new Error('No tokens available');
      }
      
      console.log(`Fetching prices for ${tokens.length} tokens`);
      
      return Promise.all(
        tokens.map(async (token) => {
          try {
            const price = await getTokenPrice(token.mintAddress);
            return {
              ...token,
              price: price.price,
              volume24h: price.volume24h,
            };
          } catch (error) {
            console.error(`Error fetching price for ${token.symbol}:`, error);
            throw error;
          }
        })
      );
    },
    enabled: !!(tokens && tokens.length > 0),
    staleTime: 30000, // 30 seconds
    retry: 2,
  });

  return {
    tokens: tokensWithPrices.data,
    isLoading: isLoadingTokens || tokensWithPrices.isLoading,
    error: error || tokensWithPrices.error,
    refetch,
  };
}
