
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, RotateCcw } from "lucide-react";
import { formatNumberWithCommas } from "@/components/chart-predictor/utils";
import ChartVisualizationMini from "./ChartVisualizationMini";

interface TokenMetrics {
  tokenAmount: number;
  tokenPrice: number;
  marketCap: number;
  fdv: number; // Fully Diluted Valuation
  liquidityPool: number;
}

const initialMetrics: TokenMetrics = {
  tokenAmount: 1000,
  tokenPrice: 0.1,
  marketCap: 10000000, // $10M
  fdv: 100000000, // $100M
  liquidityPool: 1000000, // $1M
};

const ChartPredictorMini = () => {
  const [metrics, setMetrics] = useState<TokenMetrics>(initialMetrics);
  const [isCalculated, setIsCalculated] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    // Generate chart data when calculated
    if (isCalculated) {
      generateChartData();
    }
  }, [metrics, isCalculated]);

  const handleInputChange = (name: keyof TokenMetrics, value: number) => {
    setMetrics((prev) => ({ ...prev, [name]: value }));
  };

  const handleCalculate = () => {
    setIsCalculated(true);
  };

  const resetForm = () => {
    setMetrics(initialMetrics);
    setIsCalculated(false);
    setChartData([]);
  };

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

  const generateChartData = () => {
    // Simplified version of the price pattern generator
    const basePrice = metrics.tokenPrice;
    const volatility = 0.05; 
    
    const prices = generatePricePattern(30, basePrice, volatility);
    
    // Generate volume data correlated with price changes
    const data = prices.map((price, i) => {
      const prevPrice = i > 0 ? prices[i-1] : price;
      const priceChange = Math.abs((price - prevPrice) / prevPrice);
      
      const volumeBase = metrics.liquidityPool / 10;
      const volumeVariance = volumeBase * 0.5;
      const volumeBoost = priceChange * volumeBase * 2;
      const volume = volumeBase + (Math.random() * volumeVariance) + volumeBoost;
      
      return {
        name: `Day ${i + 1}`,
        price: Number(price.toFixed(6)),
        volume: Math.round(volume),
      };
    });
    
    setChartData(data);
  };

  // Create a more realistic price movement pattern
  const generatePricePattern = (days: number, basePrice: number, volatility: number) => {
    const pricePoints = [basePrice];
    let currentPrice = basePrice;
    
    for (let i = 1; i < days; i++) {
      // Random walk with slight upward bias
      const direction = Math.random() > 0.45 ? 1 : -1;
      const changePercent = (Math.random() * volatility) * direction;
      
      // Add some momentum to price movement
      const momentum = i > 1 
        ? (pricePoints[i-1] - pricePoints[i-2]) / pricePoints[i-2] * 0.3
        : 0;
        
      currentPrice = currentPrice * (1 + changePercent + momentum);
      
      // Ensure price doesn't go below a reasonable floor
      currentPrice = Math.max(currentPrice, basePrice * 0.7);
      pricePoints.push(currentPrice);
    }
    
    return pricePoints;
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-4">
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
      </div>
      
      <div className="lg:col-span-2">
        <Card>
          <CardContent className="pt-6">
            <h4 className="text-base font-medium mb-4">Price Chart Simulation</h4>
            <ChartVisualizationMini chartData={chartData} isCalculated={isCalculated} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChartPredictorMini;
