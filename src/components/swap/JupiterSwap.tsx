
import { JupiterProvider } from '@jup-ag/react-hook';
import { Connection, clusterApiUrl } from '@solana/web3.js';
import SwapCard from './SwapCard';

const JupiterSwap = () => {
  // Create a new connection to Solana mainnet
  const connection = new Connection(clusterApiUrl('mainnet-beta'));
  
  return (
    <JupiterProvider connection={connection}>
      <div className="min-h-screen bg-background">
        <div className="container px-4 md:px-6 py-24">
          <div className="max-w-xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Token Swap</h2>
            <p className="text-muted-foreground">
              Swap tokens instantly with the best rates across Solana DEXs
            </p>
          </div>
          <SwapCard />
        </div>
      </div>
    </JupiterProvider>
  );
};

export default JupiterSwap;
