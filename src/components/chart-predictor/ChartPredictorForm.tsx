
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
    
    const data = Array.from({ length: 30 }, (_, i) => {
      // Create some random price movement with an upward trend
      const randomFactor = 1 + (Math.random() * volatility * 2 - volatility);
      const trendFactor = 1 + (i * 0.01); // Small upward trend
      const price = basePrice * randomFactor * trendFactor;
      
      return {
        name: `Day ${i + 1}`,
        price: Number(price.toFixed(6)),
        volume: Math.round(metrics.liquidityPool * randomFactor / 10),
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
