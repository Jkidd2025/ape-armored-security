
import { useQuery } from '@tanstack/react-query';
import { getTokenList, getTokenPrice, TokenInfo } from '@/services/solanaTracker';
import { mockTokensWithBalance } from '@/components/swap/mockData';
import { useToast } from '@/components/ui/use-toast';

export function useTokenList() {
  return useQuery({
    queryKey: ['tokenList'],
    queryFn: getTokenList,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3, // Increase retries for production
  });
}

export function useTokenPrice(mintAddress: string | undefined) {
  return useQuery({
    queryKey: ['tokenPrice', mintAddress],
    queryFn: () => mintAddress ? getTokenPrice(mintAddress) : null,
    enabled: !!mintAddress,
    refetchInterval: 30000, // Refetch every 30 seconds
    retry: 3, // Increase retries for production
  });
}

export function useTokensWithPrices() {
  const { toast } = useToast();
  const { data: tokens, isLoading: isLoadingTokens, error } = useTokenList();
  
  const tokensWithPrices = useQuery({
    queryKey: ['tokensWithPrices', tokens],
    queryFn: async () => {
      if (!tokens) {
        console.log("No tokens available for price fetching");
        return [];
      }
      
      console.log(`Fetching prices for ${tokens.length} tokens`);
      
      try {
        const tokensWithPrices = await Promise.all(
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
              return token;
            }
          })
        );
        return tokensWithPrices;
      } catch (error) {
        console.error("Error in bulk price fetching:", error);
        return tokens;
      }
    },
    enabled: !!tokens && tokens.length > 0,
    staleTime: 30000, // 30 seconds
    retry: 2,
  });

  // Show a toast when there's an API error
  if (error) {
    // We'll show this toast only once per session
    const hasShownErrorToast = sessionStorage.getItem('api-error-toast-shown');
    if (!hasShownErrorToast) {
      toast({
        title: "API Connection Issue",
        description: "Please try again later or contact support",
        variant: "destructive",
      });
      sessionStorage.setItem('api-error-toast-shown', 'true');
    }
  }

  return {
    tokens: tokensWithPrices.data || [],
    isLoading: isLoadingTokens || tokensWithPrices.isLoading,
    error
  };
}
