
import { useTokenPrice } from "@/hooks/useTokenPrice";
import { CircleDollarSign, ChartBar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

// Temporary sample data until we integrate with real API
const priceData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  price: 0.00075 * (1 + Math.sin(i / 5) * 0.1),
}));

const MarketData = () => {
  const { data, isLoading, error } = useTokenPrice();
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <CircleDollarSign className="mr-2 h-5 w-5 text-apearmor-teal" />
          Market Data
        </CardTitle>
        <CardDescription>
          Price and trading activity
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-muted-foreground">Current Price</span>
              {isLoading ? (
                <Skeleton className="h-7 w-4/5 mt-1" />
              ) : (
                <div className="text-xl font-medium">
                  ${data?.price || "0.00075"}
                </div>
              )}
            </div>
            
            <div>
              <span className="text-sm text-muted-foreground">24h Change</span>
              {isLoading ? (
                <Skeleton className="h-7 w-4/5 mt-1" />
              ) : (
                <div className="text-xl font-medium text-green-500">
                  +{data?.priceChange24h || "2.3"}%
                </div>
              )}
            </div>
            
            <div>
              <span className="text-sm text-muted-foreground">24h Volume</span>
              {isLoading ? (
                <Skeleton className="h-7 w-4/5 mt-1" />
              ) : (
                <div className="text-xl font-medium">
                  ${data?.volume24h?.toLocaleString() || "24,563"}
                </div>
              )}
            </div>
            
            <div>
              <span className="text-sm text-muted-foreground">Market Cap</span>
              {isLoading ? (
                <Skeleton className="h-7 w-4/5 mt-1" />
              ) : (
                <div className="text-xl font-medium">
                  ${data?.marketCap?.toLocaleString() || "748,100"}
                </div>
              )}
            </div>
          </div>
          
          <div className="h-48 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <ChartContainer 
                config={{
                  price: {
                    color: "#20c997"
                  }
                }}
              >
                <AreaChart
                  data={priceData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#20c997" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#20c997" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="date" 
                    hide
                  />
                  <YAxis hide domain={['auto', 'auto']} />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        labelFormatter={(value) => `Date: ${value}`}
                      />
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    name="price"
                    stroke="#20c997"
                    fillOpacity={1}
                    fill="url(#colorPrice)"
                  />
                </AreaChart>
              </ChartContainer>
            </ResponsiveContainer>
          </div>
        </div>
        
        {error && (
          <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-md text-sm text-red-800 dark:text-red-300">
            Error loading market data. Please try again later.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MarketData;
