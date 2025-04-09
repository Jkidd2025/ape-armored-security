
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChartPredictorForm from "@/components/chart-predictor/ChartPredictorForm";
import { Toaster } from "@/components/ui/toaster";
import { LineChart } from "lucide-react";

const ChartPredictor = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container max-w-6xl mx-auto px-4 py-20 mt-16">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="flex items-center gap-2 mb-2">
            <LineChart className="h-8 w-8 text-apearmor-teal" />
            <h1 className="text-3xl md:text-4xl font-bold text-gradient-gold text-center">
              Token Chart Predictor
            </h1>
          </div>
          <div className="h-1 w-40 bg-gradient-to-r from-transparent via-apearmor-teal to-transparent my-2"></div>
        </div>
        
        <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-10">
          Simulate token performance by adjusting various metrics to visualize potential market outcomes.
          This tool is for educational purposes only and does not constitute financial advice.
        </p>
        
        <div className="bg-muted/30 p-4 rounded-lg mb-8 border border-apearmor-darkbronze">
          <p className="text-apearmor-light text-sm">
            <span className="text-apearmor-gold font-bold">Note:</span> The chart simulations represent theoretical market outcomes based on your inputs.
            Actual cryptocurrency markets are influenced by numerous factors including market sentiment, trading volume, and external events.
            Use this tool to experiment with different scenarios and understand potential relationships between key metrics.
          </p>
        </div>
        
        <ChartPredictorForm />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default ChartPredictor;
