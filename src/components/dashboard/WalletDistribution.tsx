
import { useWalletDistribution } from "@/hooks/useWalletDistribution";
import { Wallet } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const COLORS = ["#20c997", "#4ea8de", "#845ef7", "#ff922b", "#ff6b6b"];

const WalletDistribution = () => {
  const { data, isLoading, error } = useWalletDistribution();
  const distributionData = data || sampleDistributionData;
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <Wallet className="mr-2 h-5 w-5 text-apearmor-teal" /> 
          Wallet Distribution
        </CardTitle>
        <CardDescription>
          Token holder breakdown
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Skeleton className="h-64 w-64 rounded-full" />
          </div>
        ) : error ? (
          <div className="p-3 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-md text-sm text-red-800 dark:text-red-300">
            Error loading wallet distribution. Please try again later.
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center justify-around">
            <div className="h-64 w-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`${value.toLocaleString()} APE`, 'Amount']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 md:mt-0 space-y-2">
              {distributionData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <div className="text-sm">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-muted-foreground ml-2">
                      {((item.value / distributionData.reduce((acc, curr) => acc + curr.value, 0)) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-4 text-center">
          <span className="text-xs text-muted-foreground">
            Based on on-chain data from the last 24 hours
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

// Sample data until we integrate with real API
const sampleDistributionData = [
  { name: 'Top 10 Wallets', value: 420000000 },
  { name: 'Top 11-50', value: 180000000 },
  { name: 'Top 51-100', value: 95000000 },
  { name: 'Top 101-500', value: 124000000 },
  { name: 'Other Wallets', value: 181000000 },
];

export default WalletDistribution;
