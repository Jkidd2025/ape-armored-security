
import { useJupiter } from '@jup-ag/react-hook';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowDown } from 'lucide-react';
import { useMemo } from 'react';
import { PublicKey } from '@solana/web3.js';
import JSBI from 'jsbi';

const SwapCard = () => {
  const jupiter = useJupiter({
    amount: JSBI.BigInt(1000000), // Convert to JSBI type as required
    inputMint: new PublicKey('So11111111111111111111111111111111111111112'), // SOL
    outputMint: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'), // USDC
    slippageBps: 100, // 1%
  });

  // Check if wallet is connected using the correct property
  const walletConnected = useMemo(() => {
    // The @jup-ag/react-hook API uses connected property instead of walletPublicKey
    return jupiter.connected === true;
  }, [jupiter.connected]);

  // Function to handle swap
  const handleSwapInit = () => {
    if (!jupiter || !walletConnected) return;

    // Use the Jupiter API correctly with required parameter (route)
    jupiter.exchange({ routeInfo: jupiter.routes?.[0] });
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
          disabled={!walletConnected || !jupiter.routes?.[0]}
          className="w-full bg-apearmor-teal hover:bg-apearmor-teal/80 text-black"
        >
          {walletConnected ? 'Swap Tokens' : 'Connect Wallet to Swap'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SwapCard;
