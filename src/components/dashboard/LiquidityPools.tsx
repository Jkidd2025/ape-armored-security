
import { useLiquidityPools } from "@/hooks/useLiquidityPools";
import { Database } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartBar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const LiquidityPools = () => {
  const { data: pools, isLoading, error } = useLiquidityPools();
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <Database className="mr-2 h-5 w-5 text-apearmor-teal" /> 
          Liquidity Pools
        </CardTitle>
        <CardDescription>
          Token liquidity across various protocols
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : error ? (
          <div className="p-3 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-md text-sm text-red-800 dark:text-red-300">
            Error loading liquidity pools. Please try again later.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pool</TableHead>
                <TableHead>Exchange</TableHead>
                <TableHead>APE Locked</TableHead>
                <TableHead>Total Value</TableHead>
                <TableHead>24h Volume</TableHead>
                <TableHead className="text-right">APR</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(pools || samplePoolsData).map((pool, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <div className="flex -space-x-2 mr-2">
                        <div className="w-6 h-6 rounded-full bg-apearmor-teal flex items-center justify-center text-xs text-white">
                          APE
                        </div>
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs text-white">
                          {pool.pair.split('-')[1]}
                        </div>
                      </div>
                      {pool.pair}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{pool.exchange}</Badge>
                  </TableCell>
                  <TableCell>{pool.tokenAmount.toLocaleString()}</TableCell>
                  <TableCell>${pool.totalValueLocked.toLocaleString()}</TableCell>
                  <TableCell>${pool.volume24h.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-medium text-green-600">
                    {pool.apr}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        
        <div className="mt-6 flex justify-between items-center">
          <div className="flex items-center text-sm text-muted-foreground">
            <ChartBar className="h-4 w-4 mr-1" />
            Total APE in Pools: 275,450,000 (27.5%)
          </div>
          <a href="#" className="text-sm text-apearmor-teal hover:underline">
            View all pools
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

// Sample data until we integrate with real API
const samplePoolsData = [
  {
    pair: "APE-SOL",
    exchange: "Raydium",
    tokenAmount: 125000000,
    totalValueLocked: 187500,
    volume24h: 45700,
    apr: 12.4,
  },
  {
    pair: "APE-USDC",
    exchange: "Orca",
    tokenAmount: 85000000,
    totalValueLocked: 63750,
    volume24h: 28900,
    apr: 8.6,
  },
  {
    pair: "APE-USDT",
    exchange: "Jupiter",
    tokenAmount: 45000000,
    totalValueLocked: 33750,
    volume24h: 15300,
    apr: 7.2,
  },
  {
    pair: "APE-RAY",
    exchange: "Raydium",
    tokenAmount: 20450000,
    totalValueLocked: 15337,
    volume24h: 6200,
    apr: 9.8,
  },
];

export default LiquidityPools;
