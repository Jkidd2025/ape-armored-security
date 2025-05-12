
import { useTokenStats } from "@/hooks/useTokenStats";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Database, CircleDollarSign } from "lucide-react";

const TokenStats = () => {
  const { data, isLoading, error } = useTokenStats();
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <Database className="mr-2 h-5 w-5 text-apearmor-teal" /> 
          Token Statistics
        </CardTitle>
        <CardDescription>
          Supply metrics and distribution data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <StatsItem 
            label="Total Supply" 
            value={isLoading ? undefined : data?.totalSupply || "1,000,000,000"} 
            suffix="APE"
            isLoading={isLoading}
          />
          
          <StatsItem 
            label="Circulating Supply" 
            value={isLoading ? undefined : data?.circulatingSupply || "720,013,915"} 
            suffix="APE"
            isLoading={isLoading}
            percentage={72}
          />
          
          <StatsItem 
            label="Burned Tokens" 
            value={isLoading ? undefined : data?.burnedTokens || "2,435,628"} 
            suffix="APE"
            isLoading={isLoading}
            percentage={0.24}
          />
          
          <StatsItem 
            label="Holders" 
            value={isLoading ? undefined : data?.holders || "1,893"} 
            isLoading={isLoading}
          />
        </div>
        
        {error && (
          <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-md text-sm text-red-800 dark:text-red-300">
            Error loading token statistics. Please try again later.
          </div>
        )}
        
        <div className="mt-6 text-xs text-muted-foreground text-right">
          Last updated: {new Date().toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
};

interface StatsItemProps {
  label: string;
  value?: string | number;
  suffix?: string;
  isLoading: boolean;
  percentage?: number;
}

const StatsItem = ({ label, value, suffix, isLoading, percentage }: StatsItemProps) => (
  <div>
    <div className="flex justify-between items-center mb-1">
      <span className="text-sm text-muted-foreground">{label}</span>
      {percentage !== undefined && (
        <span className="text-xs px-2 py-1 bg-apearmor-teal/10 text-apearmor-teal rounded-md">
          {percentage}% of total
        </span>
      )}
    </div>
    
    {isLoading ? (
      <Skeleton className="h-7 w-4/5" />
    ) : (
      <div className="text-xl font-medium">
        {value} {suffix && <span className="text-sm text-muted-foreground">{suffix}</span>}
      </div>
    )}
  </div>
);

export default TokenStats;
