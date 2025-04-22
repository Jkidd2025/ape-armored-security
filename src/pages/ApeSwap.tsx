
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const ApeSwap = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 container px-4 md:px-6 py-16 flex flex-col justify-center min-h-[calc(100vh-4rem)]">
        <div className="w-full max-w-2xl mx-auto space-y-6 mt-12 pt-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gradient-gold text-center">
            Ape Swap
          </h1>
          <p className="text-center mb-6 text-muted-foreground">
            Trade tokens instantly with the best rates across Solana
          </p>
          <Card className="w-full bg-black/40 border-apearmor-darkbronze border shadow-lg">
            <CardContent className="p-6 text-center">
              <p className="text-lg text-muted-foreground">
                Swap functionality coming soon. We are working on integrating Jupiter Ultra API for the best swap experience.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApeSwap;
