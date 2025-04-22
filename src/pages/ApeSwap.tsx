
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SwapCard from "@/components/swap/SwapCard";
import { useIsMobile } from '@/hooks/use-mobile';

const ApeSwap = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 container px-2 md:px-6 py-4 md:py-8">
        <div className={`${isMobile ? 'max-w-full' : 'max-w-2xl'} mx-auto`}>
          <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3 text-gradient-gold text-center">
            Swap Tokens
          </h1>
          <p className="text-sm md:text-base text-center mb-3 md:mb-6 text-muted-foreground">
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
