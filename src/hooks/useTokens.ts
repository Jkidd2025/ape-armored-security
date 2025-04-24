
import { useQuery } from '@tanstack/react-query';
import { getTokenList, getTokenPrice, TokenInfo } from '@/services/solanaTracker';

export function useTokenList() {
  return useQuery({
    queryKey: ['tokenList'],
    queryFn: getTokenList,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useTokenPrice(mintAddress: string | undefined) {
  return useQuery({
    queryKey: ['tokenPrice', mintAddress],
    queryFn: () => mintAddress ? getTokenPrice(mintAddress) : null,
    enabled: !!mintAddress,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}

export function useTokensWithPrices() {
  const { data: tokens, isLoading: isLoadingTokens } = useTokenList();
  
  const tokensWithPrices = useQuery({
    queryKey: ['tokensWithPrices', tokens],
    queryFn: async () => {
      if (!tokens) return [];
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
    },
    enabled: !!tokens,
    staleTime: 30000, // 30 seconds
  });

  return {
    tokens: tokensWithPrices.data,
    isLoading: isLoadingTokens || tokensWithPrices.isLoading,
  };
}
