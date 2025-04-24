
import { useQuery } from '@tanstack/react-query';
import { getTokenList, getTokenPrice, TokenInfo } from '@/services/solanaTracker';
import { mockTokensWithBalance } from '@/components/swap/mockData';
import { useToast } from '@/components/ui/use-toast';

export function useTokenList() {
  return useQuery({
    queryKey: ['tokenList'],
    queryFn: getTokenList,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1, // Only retry once
  });
}

export function useTokenPrice(mintAddress: string | undefined) {
  return useQuery({
    queryKey: ['tokenPrice', mintAddress],
    queryFn: () => mintAddress ? getTokenPrice(mintAddress) : null,
    enabled: !!mintAddress,
    refetchInterval: 30000, // Refetch every 30 seconds
    retry: 1, // Only retry once
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
  });

  // Show a toast when we fall back to mock data
  if (error && !tokensWithPrices.data) {
    // We'll show this toast only once per session
    const hasShownErrorToast = sessionStorage.getItem('api-error-toast-shown');
    if (!hasShownErrorToast) {
      toast({
        title: "API Connection Issue",
        description: "Using demo data for the swap interface",
        variant: "warning",
      });
      sessionStorage.setItem('api-error-toast-shown', 'true');
    }
  }

  // Return mock data if there's an error fetching tokens
  return {
    tokens: (tokens && tokensWithPrices.data) || mockTokensWithBalance,
    isLoading: isLoadingTokens && !error, // Don't show loading if there's an error
    error
  };
}
