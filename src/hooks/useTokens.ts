
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
      
      // Process tokens in smaller batches to avoid too many concurrent requests
      const batchSize = 3;
      const result: (TokenInfo & { price?: number, volume24h?: number })[] = [];
      
      for (let i = 0; i < tokens.length; i += batchSize) {
        const batch = tokens.slice(i, i + batchSize);
        const batchResults = await Promise.allSettled(
          batch.map(async (token) => {
            try {
              const price = await getTokenPrice(token.mintAddress);
              return {
                ...token,
                price: price.price,
                volume24h: price.volume24h,
              };
            } catch (error) {
              console.warn(`Error fetching price for ${token.symbol}:`, error);
              return {
                ...token,
                price: token.price || 0,
                volume24h: token.volume24h || 0,
              };
            }
          })
        );
        
        batchResults.forEach((res) => {
          if (res.status === 'fulfilled') {
            result.push(res.value);
          }
        });
        
        // Add a small delay between batches to avoid overwhelming the API
        if (i + batchSize < tokens.length) {
          await new Promise(resolve => setTimeout(resolve, 300));
        }
      }
      
      return result;
    },
    enabled: !!(tokens && tokens.length > 0),
    staleTime: 30000, // 30 seconds
    retry: 2,
    meta: {
      onError: (error: Error) => {
        console.error('Error fetching token prices:', error);
        toast({
          title: "Error loading token prices",
          description: "Using cached data if available",
          variant: "destructive",
        });
      }
    }
  });

  return {
    tokens: tokensWithPrices.data || tokens || [],
    isLoading: isLoadingTokens && tokensWithPrices.isLoading,
    error: error || tokensWithPrices.error,
    refetch,
  };
}
