
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChartPredictorForm from "@/components/chart-predictor/ChartPredictorForm";
import { Toaster } from "@/components/ui/toaster";

const ChartPredictor = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container max-w-6xl mx-auto px-4 py-20 mt-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gradient-gold text-center mb-8">
          Chart Predictor
        </h1>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-10">
          Simulate token performance by adjusting various metrics to visualize potential market outcomes.
          This tool is for educational purposes only and does not constitute financial advice.
        </p>
        
        <ChartPredictorForm />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default ChartPredictor;
