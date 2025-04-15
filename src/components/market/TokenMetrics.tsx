
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { fetchTokenMetrics } from '@/lib/helius';
import { CircleDollarSign, Users, TrendingUp, TrendingDown, BarChart } from 'lucide-react';

interface TokenMetricsProps {
  tokenAddress: string;
}

const TokenMetrics: React.FC<TokenMetricsProps> = ({ tokenAddress }) => {
  const { toast } = useToast();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['tokenMetrics', tokenAddress],
    queryFn: () => fetchTokenMetrics(tokenAddress),
    retry: 2,
    refetchInterval: 60000, // Refetch every minute
    onError: (err) => {
      console.error('Error fetching token metrics:', err);
      toast({
        title: "Error loading market data",
        description: "Unable to fetch token metrics. Please try again later.",
        variant: "destructive",
      });
    },
  });

  if (error) {
    return (
      <div className="bg-card border border-apearmor-darkbronze rounded-lg p-6 text-center">
        <p className="text-destructive">Failed to load token metrics. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="border-apearmor-darkbronze hover:border-apearmor-teal transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <CircleDollarSign className="h-5 w-5 text-apearmor-teal" />
            Total Circulating Supply
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-8 w-24" />
          ) : (
            <div className="text-3xl font-bold text-apearmor-gold">
              {data?.circulatingSupply?.toLocaleString() || "N/A"}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-apearmor-darkbronze hover:border-apearmor-teal transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <BarChart className="h-5 w-5 text-apearmor-teal" />
            Current Price
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-8 w-24" />
          ) : (
            <div className="text-3xl font-bold text-apearmor-gold">
              ${data?.currentPrice?.toFixed(4) || "N/A"}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-apearmor-darkbronze hover:border-apearmor-teal transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="h-5 w-5 text-apearmor-teal" />
            Holders
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-8 w-24" />
          ) : (
            <div className="text-3xl font-bold text-apearmor-gold">
              {data?.holders?.toLocaleString() || "N/A"}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-apearmor-darkbronze hover:border-apearmor-teal transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-apearmor-teal" />
            Number of Buys (24h)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-8 w-24" />
          ) : (
            <div className="text-3xl font-bold text-apearmor-gold">
              {data?.buyCount?.toLocaleString() || "N/A"}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-apearmor-darkbronze hover:border-apearmor-teal transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingDown className="h-5 w-5 text-apearmor-teal" />
            Number of Sales (24h)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-8 w-24" />
          ) : (
            <div className="text-3xl font-bold text-apearmor-gold">
              {data?.sellCount?.toLocaleString() || "N/A"}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TokenMetrics;
