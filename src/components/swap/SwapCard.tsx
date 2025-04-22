
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const SwapCard = () => {
  return (
    <Card className="w-full shadow-lg">
      <CardContent className="p-0 overflow-hidden rounded-lg">
        <iframe
          src="https://jup.ag/swap?embed=true&simple=true&hideAnalytics=true&hideInfoFeature=true&theme=dark"
          frameBorder="0"
          className="w-full min-h-[640px]"
          title="Ape Swap powered by Jupiter"
          allow="clipboard-write"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </CardContent>
    </Card>
  );
};

export default SwapCard;
