
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import TokenInput from "./calculators/TokenInput";
import TokenValueDisplay from "./calculators/TokenValueDisplay";
import { Slider } from "@/components/ui/slider";
import { formatNumber, formatCurrency, publicLaunchPrice } from "./calculators/tokenCalculationUtils";

const TokenCalculator = () => {
  const [tokenAmount, setTokenAmount] = useState<string>("");
  const [calculatedValue, setCalculatedValue] = useState<number | null>(null);
  const [tokenPrice, setTokenPrice] = useState<number>(publicLaunchPrice);
  
  const handleCalculate = () => {
    setCalculatedValue(tokenAmount && !isNaN(Number(tokenAmount)) ? 1 : null);
  };

  const handleSliderChange = (value: number[]) => {
    const newAmount = value[0].toString();
    setTokenAmount(newAmount);
    if (calculatedValue !== null) {
      setCalculatedValue(1); // Recalculate when slider changes
    }
  };

  const handlePriceSliderChange = (value: number[]) => {
    setTokenPrice(value[0]);
    if (calculatedValue !== null) {
      setCalculatedValue(1); // Recalculate when price changes
    }
  };

  // Format the slider value for display
  const formattedSliderValue = tokenAmount && !isNaN(Number(tokenAmount)) 
    ? formatNumber(Number(tokenAmount))
    : "0";

  return (
    <div className="mb-10">
      <h3 className="text-xl font-semibold mt-6 mb-3">5.7 Token Value Calculator</h3>
      <div className="p-6 bg-muted rounded-lg border border-border">
        <div className="flex flex-col gap-4">
          <TokenInput 
            tokenAmount={tokenAmount} 
            setTokenAmount={setTokenAmount} 
          />
          
          {/* Add the token amount slider component */}
          {calculatedValue !== null && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Adjust Token Amount</span>
                <span className="text-sm font-medium">{formattedSliderValue}</span>
              </div>
              <Slider
                defaultValue={[0]}
                value={[tokenAmount ? Number(tokenAmount) : 0]}
                max={1000000}
                step={1000}
                onValueChange={handleSliderChange}
                className="bg-apearmor-teal/20"
              />
            </div>
          )}
          
          {/* Add the token price slider component */}
          {calculatedValue !== null && (
            <div className="space-y-2 mt-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Adjust Token Price</span>
                <span className="text-sm font-medium">${formatCurrency(tokenPrice)}</span>
              </div>
              <Slider
                defaultValue={[publicLaunchPrice]}
                value={[tokenPrice]}
                min={0.00001}
                max={0.001}
                step={0.00001}
                onValueChange={handlePriceSliderChange}
                className="bg-apearmor-teal/20"
              />
            </div>
          )}
          
          <Button 
            onClick={handleCalculate}
            className="w-full bg-apearmor-teal hover:bg-apearmor-teal/90"
          >
            Calculate Value
          </Button>
          
          {calculatedValue !== null && (
            <TokenValueDisplay 
              tokenAmount={tokenAmount} 
              tokenPrice={tokenPrice}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenCalculator;
