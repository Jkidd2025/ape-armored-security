
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import MetricsInputs from "./MetricsInputs";
import ChartVisualization from "./ChartVisualization";
import ResultsDisplay from "./ResultsDisplay";
import { useToast } from "@/hooks/use-toast";

export interface TokenMetrics {
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

const ChartPredictorForm = () => {
  const [metrics, setMetrics] = useState<TokenMetrics>(initialMetrics);
  const [isCalculated, setIsCalculated] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Generate initial chart data
    if (isCalculated) {
      generateChartData();
    }
  }, [metrics, isCalculated]);

  const handleInputChange = (name: keyof TokenMetrics, value: number) => {
    setMetrics((prev) => ({ ...prev, [name]: value }));
  };

  const handleCalculate = () => {
    // Validate inputs
    if (metrics.tokenAmount <= 0 || metrics.tokenPrice <= 0) {
      toast({
        title: "Invalid input",
        description: "Token amount and price must be greater than zero.",
        variant: "destructive",
      });
      return;
    }

    // Set calculated state to true to generate chart data
    setIsCalculated(true);
    toast({
      title: "Calculation complete",
      description: "Chart and metrics have been updated.",
    });
  };

  const generateChartData = () => {
    // Generate simulated price data points for the chart
    const basePrice = metrics.tokenPrice;
    const volatility = 0.05; // 5% volatility
    
    // Create a more realistic price movement pattern
    const generatePricePattern = (days: number, basePrice: number, volatility: number) => {
      // Create some key market movements with slightly higher probability of upward movement
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
    
    const prices = generatePricePattern(30, basePrice, volatility);
    
    // Generate volume data that somewhat correlates with price changes
    const data = prices.map((price, i) => {
      const prevPrice = i > 0 ? prices[i-1] : price;
      const priceChange = Math.abs((price - prevPrice) / prevPrice);
      
      // Volume tends to be higher when price changes more dramatically
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

  const resetForm = () => {
    setMetrics(initialMetrics);
    setIsCalculated(false);
    setChartData([]);
    toast({
      title: "Form reset",
      description: "All values have been reset to defaults.",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-1">
        <CardContent className="pt-6">
          <MetricsInputs 
            metrics={metrics} 
            onInputChange={handleInputChange}
            onCalculate={handleCalculate}
            onReset={resetForm}
          />
        </CardContent>
      </Card>
      
      <div className="lg:col-span-2 space-y-8">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold mb-4">Price Chart Simulation</h3>
            <ChartVisualization chartData={chartData} isCalculated={isCalculated} />
          </CardContent>
        </Card>
        
        {isCalculated && (
          <Card>
            <CardContent className="pt-6">
              <ResultsDisplay metrics={metrics} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ChartPredictorForm;
