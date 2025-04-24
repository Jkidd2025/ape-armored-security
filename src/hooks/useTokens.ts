
import { useQuery } from '@tanstack/react-query';
import { getTokenList, getTokenPrice, TokenInfo } from '@/services/solanaTracker';
import { mockTokensWithBalance } from '@/components/swap/mockData';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';

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
  const [usesMockData, setUsesMockData] = useState(false);
  
  const { data: tokens, isLoading: isLoadingTokens, error, refetch } = useTokenList();
  
  // If we have an error and haven't fallen back to mock data yet, do it now
  if (error && !usesMockData) {
    toast({
      title: "API Connection Issue",
      description: "Using demo data due to connection issues. Some features may be limited.",
      variant: "default",
    });
    setUsesMockData(true);
  }
  
  const tokensWithPrices = useQuery({
    queryKey: ['tokensWithPrices', tokens],
    queryFn: async () => {
      // If we're using mock data or tokens failed to load, return mock data
      if (usesMockData || !tokens) {
        console.log("Using mock data for token prices");
        return mockTokensWithBalance;
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
    enabled: !!(tokens && tokens.length > 0) || usesMockData,
    staleTime: 30000, // 30 seconds
    retry: 2,
  });

  return {
    tokens: tokensWithPrices.data || mockTokensWithBalance,
    isLoading: isLoadingTokens && tokensWithPrices.isLoading && !usesMockData,
    error: usesMockData ? null : error,
    refetch,
    usesMockData
  };
}
