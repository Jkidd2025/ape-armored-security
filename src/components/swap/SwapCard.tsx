
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from '@/hooks/use-mobile';

const SwapCard = () => {
  const isMobile = useIsMobile();
  
  // Create different URL parameters for mobile vs desktop
  const jupiterUrl = isMobile
    ? "https://jup.ag/swap/SOL-USDC?embed=true&fullWidth=true&theme=dark&allowWalletChange=true&responsive=true"
    : "https://jup.ag/swap/SOL-USDC?embed=true&fullWidth=true&theme=dark&allowWalletChange=true";
    
  return (
    <Card className="w-full shadow-lg">
      <CardContent className="p-0 overflow-hidden rounded-lg">
        <iframe
          src={jupiterUrl}
          frameBorder="0"
          className={`w-full ${isMobile ? 'min-h-[560px]' : 'min-h-[640px]'}`}
          title="Ape Swap powered by Jupiter"
          allow="clipboard-write clipboard-read"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-top-navigation"
        />
      </CardContent>
    </Card>
  );
};

export default SwapCard;
