
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, RotateCcw } from "lucide-react";
import { formatNumberWithCommas } from "@/components/chart-predictor/utils";
import { TokenMetrics } from "./types/TokenTypes";

interface TokenMetricsFormProps {
  metrics: TokenMetrics;
  handleInputChange: (name: keyof TokenMetrics, value: number) => void;
  handleCalculate: () => void;
  resetForm: () => void;
}

const TokenMetricsForm: React.FC<TokenMetricsFormProps> = ({
  metrics,
  handleInputChange,
  handleCalculate,
  resetForm
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof TokenMetrics) => {
    const rawValue = e.target.value;
    
    // Allow empty input for better UX
    if (rawValue === "") {
      handleInputChange(field, 0);
      return;
    }
    
    // Remove commas and convert to number
    const numericValue = parseFloat(rawValue.replace(/,/g, ""));
    
    // Validate and update if it's a number
    if (!isNaN(numericValue)) {
      handleInputChange(field, numericValue);
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
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Calculator className="h-4 w-4 text-apearmor-teal" />
          <h4 className="text-base font-medium">Token Metrics</h4>
        </div>
        
        <div className="space-y-3">
          <div className="space-y-1">
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
          
          <div className="space-y-1">
            <Label htmlFor="marketCap">Market Cap (USD)</Label>
            <Input
              id="marketCap"
              value={displayValues.marketCap}
              onChange={(e) => handleChange(e, "marketCap")}
              placeholder="Enter market cap"
            />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="liquidityPool">Liquidity Pool (USD)</Label>
            <Input
              id="liquidityPool"
              value={displayValues.liquidityPool}
              onChange={(e) => handleChange(e, "liquidityPool")}
              placeholder="Enter liquidity pool amount"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={handleCalculate}
            className="flex-1 bg-apearmor-teal hover:bg-apearmor-teal/80 text-black"
          >
            <Calculator className="h-4 w-4 mr-2" />
            Calculate
          </Button>
          <Button 
            onClick={resetForm}
            variant="outline"
            className="flex-shrink-0"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenMetricsForm;
