
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SwapCard from "@/components/swap/SwapCard";

const ApeSwap = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 container px-4 md:px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-gold text-center">
            Ape Swap
          </h1>
          <p className="text-center mb-8 text-muted-foreground">
            Swap tokens instantly with the best rates on Solana
          </p>
          <SwapCard />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApeSwap;
