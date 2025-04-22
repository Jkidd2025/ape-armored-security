
import { useJupiter } from '@jup-ag/react-hook';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ExchangeIcon } from 'lucide-react';

const SwapCard = () => {
  const { connected, initSwap } = useJupiter();

  return (
    <Card className="max-w-md mx-auto border border-apearmor-darkbronze">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="text-center">
            {connected ? (
              <p className="text-sm text-green-500">Wallet Connected</p>
            ) : (
              <p className="text-sm text-yellow-500">Please connect your wallet</p>
            )}
          </div>
          <div className="flex justify-center">
            <ExchangeIcon className="h-8 w-8 text-apearmor-teal" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6">
        <Button 
          onClick={() => initSwap()}
          disabled={!connected}
          className="w-full bg-apearmor-teal hover:bg-apearmor-teal/80 text-black"
        >
          {connected ? 'Swap Tokens' : 'Connect Wallet to Swap'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SwapCard;
