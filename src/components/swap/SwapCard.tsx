
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const SwapCard = () => {
  return (
    <Card className="w-full shadow-lg">
      <CardContent className="p-0 overflow-hidden rounded-lg">
        <iframe
          src="https://jup.ag/swap/SOL-USDC?embed=true&fullWidth=true&theme=dark&allowWalletChange=true"
          frameBorder="0"
          className="w-full min-h-[640px]"
          title="Ape Swap powered by Jupiter"
          allow="clipboard-write clipboard-read"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-top-navigation"
        />
      </CardContent>
    </Card>
  );
};

export default SwapCard;
