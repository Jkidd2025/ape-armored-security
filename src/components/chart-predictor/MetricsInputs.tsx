
import React from "react";
import { TokenMetrics } from "./ChartPredictorForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChartBar, Calculator, RotateCcw } from "lucide-react";
import { formatNumberWithCommas } from "./utils";

interface MetricsInputsProps {
  metrics: TokenMetrics;
  onInputChange: (name: keyof TokenMetrics, value: number) => void;
  onCalculate: () => void;
  onReset: () => void;
}

const MetricsInputs: React.FC<MetricsInputsProps> = ({
  metrics,
  onInputChange,
  onCalculate,
  onReset,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof TokenMetrics) => {
    const rawValue = e.target.value;
    
    // Allow empty input for better UX
    if (rawValue === "") {
      onInputChange(field, 0);
      return;
    }
    
    // Remove commas and convert to number
    const numericValue = parseFloat(rawValue.replace(/,/g, ""));
    
    // Validate and update if it's a number
    if (!isNaN(numericValue)) {
      onInputChange(field, numericValue);
    }
  };

  // Format display values with commas for readability
  const displayValues = {
    tokenAmount: formatNumberWithCommas(metrics.tokenAmount),
    tokenPrice: metrics.tokenPrice,
    marketCap: formatNumberWithCommas(metrics.marketCap),
    fdv: formatNumberWithCommas(metrics.fdv),
    liquidityPool: formatNumberWithCommas(metrics.liquidityPool),
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-2 mb-4">
        <ChartBar className="h-5 w-5 text-apearmor-teal" />
        <h3 className="text-xl font-semibold">Token Metrics</h3>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="tokenAmount">Number of Tokens</Label>
          <Input
            id="tokenAmount"
            value={displayValues.tokenAmount}
            onChange={(e) => handleChange(e, "tokenAmount")}
            placeholder="Enter token amount"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tokenPrice">Price (USD)</Label>
          <Input
            id="tokenPrice"
            value={displayValues.tokenPrice}
            onChange={(e) => handleChange(e, "tokenPrice")}
            placeholder="Enter token price"
            type="number"
            step="0.000001"
            min="0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="marketCap">Market Cap (USD)</Label>
          <Input
            id="marketCap"
            value={displayValues.marketCap}
            onChange={(e) => handleChange(e, "marketCap")}
            placeholder="Enter market cap"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fdv">Fully Diluted Valuation (USD)</Label>
          <Input
            id="fdv"
            value={displayValues.fdv}
            onChange={(e) => handleChange(e, "fdv")}
            placeholder="Enter FDV"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="liquidityPool">Liquidity Pool (USD)</Label>
          <Input
            id="liquidityPool"
            value={displayValues.liquidityPool}
            onChange={(e) => handleChange(e, "liquidityPool")}
            placeholder="Enter liquidity pool amount"
          />
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <Button 
          onClick={onCalculate}
          className="w-full bg-apearmor-teal hover:bg-apearmor-teal/80 text-black"
        >
          <Calculator className="h-4 w-4 mr-2" />
          Calculate
        </Button>
        <Button 
          onClick={onReset}
          variant="outline"
          className="flex-shrink-0"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MetricsInputs;
