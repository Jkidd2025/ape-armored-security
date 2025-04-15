
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import TokenMetrics from "./market/TokenMetrics";

const ApeMarket = () => {
  return (
    <section id="ape-market" className="py-20 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient-gold mb-4">Ape Market</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mb-8">
            Real-time metrics and market data for the ApeArmor token
          </p>
          <Separator className="w-20 h-1 bg-apearmor-teal mb-8" />
        </div>
        
        <TokenMetrics tokenAddress="786Yz5T1yd9BzWMgWMCrPEB8WeGWAT1xyzwTNcKiKkJD" />
      </div>
    </section>
  );
};

export default ApeMarket;
