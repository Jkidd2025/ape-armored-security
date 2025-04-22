
import { useJupiter } from '@jup-ag/react-hook';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowDown } from 'lucide-react';

const SwapCard = () => {
  const jupiter = useJupiter();

  // Check if wallet is connected based on jupiter state
  const walletConnected = jupiter?.wallet?.publicKey != null;

  // Function to initialize swap with required configuration
  const handleSwapInit = () => {
    if (jupiter && jupiter.exchange) {
      jupiter.exchange({
        // Default configuration
        inputMint: "So11111111111111111111111111111111111111112", // SOL
        outputMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC
        amount: 1000000, // 0.001 SOL (in lamports)
        slippage: 1 // 1%
      });
    }
  };

  return (
    <Card className="max-w-md mx-auto border border-apearmor-darkbronze">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="text-center">
            {walletConnected ? (
              <p className="text-sm text-green-500">Wallet Connected</p>
            ) : (
              <p className="text-sm text-yellow-500">Please connect your wallet</p>
            )}
          </div>
          <div className="flex justify-center">
            <ArrowDown className="h-8 w-8 text-apearmor-teal" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6">
        <Button 
          onClick={handleSwapInit}
          disabled={!walletConnected}
          className="w-full bg-apearmor-teal hover:bg-apearmor-teal/80 text-black"
        >
          {walletConnected ? 'Swap Tokens' : 'Connect Wallet to Swap'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SwapCard;
