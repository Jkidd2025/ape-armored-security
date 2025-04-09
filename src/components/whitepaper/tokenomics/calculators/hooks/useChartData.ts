
import { useState, useEffect } from "react";
import { TokenMetrics } from "../types/TokenTypes";

export const useChartData = (
  metrics: TokenMetrics, 
  isCalculated: boolean,
  priceAppreciation: number = 0
) => {
  const [chartData, setChartData] = useState<any[]>([]);
  
  useEffect(() => {
    // Generate chart data when calculated or when metrics change
    if (isCalculated) {
      generateChartData();
    }
  }, [metrics, isCalculated, priceAppreciation]);

  const generateChartData = () => {
    // Simplified version of the price pattern generator
    const basePrice = metrics.tokenPrice;
    const volatility = 0.05 + (priceAppreciation ? priceAppreciation / 500 : 0); 
    
    const prices = generatePricePattern(30, basePrice, volatility, priceAppreciation);
    
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
  const generatePricePattern = (
    days: number, 
    basePrice: number, 
    volatility: number,
    priceAppreciation: number = 0
  ) => {
    const pricePoints = [basePrice];
    let currentPrice = basePrice;
    
    // Use price appreciation to add upward bias
    const upwardBias = priceAppreciation ? priceAppreciation / 1000 : 0;
    
    for (let i = 1; i < days; i++) {
      // Random walk with upward bias
      const direction = Math.random() > (0.45 - upwardBias) ? 1 : -1;
      const changePercent = (Math.random() * volatility) * direction;
      
      // Add some momentum to price movement
      const momentum = i > 1 
        ? (pricePoints[i-1] - pricePoints[i-2]) / pricePoints[i-2] * 0.3
        : 0;
        
      currentPrice = currentPrice * (1 + changePercent + momentum + upwardBias);
      
      // Ensure price doesn't go below a reasonable floor
      currentPrice = Math.max(currentPrice, basePrice * 0.7);
      pricePoints.push(currentPrice);
    }
    
    return pricePoints;
  };

  return { chartData, generateChartData };
};
