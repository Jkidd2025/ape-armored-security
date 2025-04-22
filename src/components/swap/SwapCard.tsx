
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SwapCard = () => {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Ape Swap powered by Jupiter</CardTitle>
      </CardHeader>
      <CardContent>
        <iframe
          src="https://jup.ag/swap?embed=true&simple=true&hideAnalytics=true&hideInfoFeature=true"
          frameBorder="0"
          className="w-full min-h-[600px] rounded-lg"
          title="Jupiter Terminal"
          allow="clipboard-write"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </CardContent>
    </Card>
  );
};

export default SwapCard;
