
import React from "react";
import { TokenMetrics } from "./ChartPredictorForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatNumberWithCommas, calculateTokenStats } from "./utils";
import { TrendingUp, ChartCandlestick, ArrowUp, ArrowDown } from "lucide-react";

interface ResultsDisplayProps {
  metrics: TokenMetrics;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ metrics }) => {
  const stats = calculateTokenStats(metrics);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <ChartCandlestick className="h-5 w-5 text-apearmor-teal" />
        <h3 className="text-xl font-semibold">Token Analysis</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatsCard 
          title="Current Valuation"
          stats={[
            { label: "Token Price", value: `$${metrics.tokenPrice.toFixed(6)}` },
            { label: "Market Cap", value: `$${formatNumberWithCommas(metrics.marketCap)}` },
            { label: "FDV", value: `$${formatNumberWithCommas(metrics.fdv)}` },
          ]}
        />
        
        <StatsCard 
          title="Token Supply"
          stats={[
            { label: "Your Tokens", value: formatNumberWithCommas(metrics.tokenAmount) },
            { label: "Your Value", value: `$${formatNumberWithCommas(metrics.tokenAmount * metrics.tokenPrice)}` },
            { label: "% of Supply", value: `${stats.percentOfSupply.toFixed(4)}%` },
          ]}
        />
        
        <StatsCard 
          title="Liquidity Analysis"
          stats={[
            { label: "LP Size", value: `$${formatNumberWithCommas(metrics.liquidityPool)}` },
            { label: "LP as % of MC", value: `${stats.lpToMarketCapRatio.toFixed(2)}%` },
            { label: "Slippage Impact", value: stats.slippageImpact },
          ]}
        />
        
        <StatsCard 
          title="Price Scenarios"
          stats={[
            { 
              label: "10% Up", 
              value: `$${(metrics.tokenPrice * 1.1).toFixed(6)}`,
              icon: <ArrowUp className="h-3 w-3 text-green-500" />
            },
            { 
              label: "Your Value at +10%", 
              value: `$${formatNumberWithCommas(metrics.tokenAmount * metrics.tokenPrice * 1.1)}` 
            },
            { 
              label: "10% Down", 
              value: `$${(metrics.tokenPrice * 0.9).toFixed(6)}`,
              icon: <ArrowDown className="h-3 w-3 text-red-500" />
            },
          ]}
        />
      </div>
      
      <div className="p-4 bg-muted rounded-lg text-sm text-muted-foreground">
        <p className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-apearmor-teal" />
          <span>
            This simulation is for educational purposes only. Real market conditions may vary significantly.
          </span>
        </p>
      </div>
    </div>
  );
};

interface StatsCardProps {
  title: string;
  stats: {
    label: string;
    value: string;
    icon?: React.ReactNode;
  }[];
}

const StatsCard: React.FC<StatsCardProps> = ({ title, stats }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="space-y-2">
          {stats.map((stat, i) => (
            <div key={i} className="flex justify-between text-sm">
              <dt className="text-muted-foreground">{stat.label}</dt>
              <dd className="font-medium flex items-center gap-1">
                {stat.icon}
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
};

export default ResultsDisplay;
