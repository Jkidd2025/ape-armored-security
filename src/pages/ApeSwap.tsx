
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SwapCard from "@/components/swap/SwapCard";

const ApeSwap = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 container px-4 md:px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gradient-gold text-center">
            Swap Tokens
          </h1>
          <p className="text-center mb-6 text-muted-foreground">
            Trade tokens instantly with the best rates across Solana
          </p>
          <SwapCard />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApeSwap;
