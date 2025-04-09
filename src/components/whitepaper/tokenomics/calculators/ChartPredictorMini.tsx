
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ChartVisualizationMini from "./ChartVisualizationMini";
import TokenMetricsForm from "./TokenMetricsForm";
import { useChartData } from "./hooks/useChartData";
import { TokenMetrics, ChartPredictorMiniProps, initialMetrics } from "./types/TokenTypes";

const ChartPredictorMini: React.FC<ChartPredictorMiniProps> = ({ 
  initialTokenAmount, 
  initialTokenPrice = 0.1,
  priceAppreciation = 0
}) => {
  const [metrics, setMetrics] = useState<TokenMetrics>({
    ...initialMetrics,
    tokenAmount: initialTokenAmount || initialMetrics.tokenAmount,
    tokenPrice: initialTokenPrice
  });
  const [isCalculated, setIsCalculated] = useState(false);

  // Use the extracted chart data hook
  const { chartData } = useChartData(metrics, isCalculated, priceAppreciation);

  useEffect(() => {
    // Update token amount if passed from parent
    if (initialTokenAmount && initialTokenAmount > 0) {
      setMetrics(prev => ({ ...prev, tokenAmount: initialTokenAmount }));
    }
  }, [initialTokenAmount]);

  useEffect(() => {
    // Update price based on price appreciation
    if (initialTokenPrice && priceAppreciation !== undefined) {
      const appreciatedPrice = initialTokenPrice * (1 + (priceAppreciation / 100));
      setMetrics(prev => ({ ...prev, tokenPrice: appreciatedPrice }));
    }
  }, [initialTokenPrice, priceAppreciation]);

  // Auto-calculate on first render when data is passed from parent
  useEffect(() => {
    if ((initialTokenAmount && initialTokenAmount > 0) || priceAppreciation !== undefined) {
      if (!isCalculated) {
        setIsCalculated(true);
      }
    }
  }, []);

  const handleInputChange = (name: keyof TokenMetrics, value: number) => {
    setMetrics((prev) => ({ ...prev, [name]: value }));
  };

  const handleCalculate = () => {
    setIsCalculated(true);
  };

  const resetForm = () => {
    setMetrics({
      ...initialMetrics,
      tokenAmount: initialTokenAmount || initialMetrics.tokenAmount,
      tokenPrice: initialTokenPrice
    });
    setIsCalculated(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-4">
        <TokenMetricsForm 
          metrics={metrics}
          handleInputChange={handleInputChange}
          handleCalculate={handleCalculate}
          resetForm={resetForm}
        />
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
