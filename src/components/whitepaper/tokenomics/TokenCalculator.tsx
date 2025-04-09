import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import TokenInput from "./calculators/TokenInput";
import TokenValueDisplay from "./calculators/TokenValueDisplay";
import ChartPredictorMini from "./calculators/ChartPredictorMini";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, LineChart } from "lucide-react";
import { publicLaunchPrice } from "./calculators/tokenCalculationUtils";

const TokenCalculator = () => {
  const [tokenAmount, setTokenAmount] = useState<string>("");
  const [calculatedValue, setCalculatedValue] = useState<number | null>(null);
  const [priceAppreciation, setPriceAppreciation] = useState<number>(0);
  
  const calculateTokenValue = () => {
    if (tokenAmount && !isNaN(Number(tokenAmount))) {
      const amount = parseFloat(tokenAmount);
      setCalculatedValue(amount * publicLaunchPrice);
      return amount * publicLaunchPrice;
    }
    return null;
  };

  const handleCalculate = () => {
    calculateTokenValue();
  };

  return (
    <div className="mb-10">
      <h3 className="text-xl font-semibold mt-6 mb-3">5.7 Token Value Calculator</h3>
      <div className="p-6 bg-muted rounded-lg border border-border">
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              <span>Value Calculator</span>
            </TabsTrigger>
            <TabsTrigger value="chart" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              <span>Chart Predictor</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="calculator">
            <div className="flex flex-col gap-4">
              <TokenInput 
                tokenAmount={tokenAmount} 
                setTokenAmount={setTokenAmount} 
              />
              
              <Button 
                onClick={handleCalculate}
                className="w-full bg-apearmor-teal hover:bg-apearmor-teal/90"
              >
                Calculate Value
              </Button>
              
              {calculatedValue !== null && (
                <TokenValueDisplay 
                  tokenAmount={tokenAmount} 
                  priceAppreciation={priceAppreciation}
                  setPriceAppreciation={setPriceAppreciation}
                />
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="chart">
            <ChartPredictorMini 
              initialTokenAmount={tokenAmount !== "" ? parseFloat(tokenAmount) : undefined}
              initialTokenPrice={publicLaunchPrice}
              priceAppreciation={priceAppreciation}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TokenCalculator;
