
import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { useToast } from '@/components/ui/use-toast';

let connection: Connection | null = null;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

export const initConnection = async (): Promise<Connection> => {
  if (connection) {
    return connection;
  }

  let retries = 0;
  let lastError: Error | null = null;

  while (retries < MAX_RETRIES) {
    try {
      const rpcUrl = await getHeliusRpcUrl();
      connection = new Connection(rpcUrl, {
        commitment: 'confirmed',
        confirmTransactionInitialTimeout: 60000, // 60 seconds
      });

      // Verify connection is working
      await connection.getSlot();
      console.log('Successfully initialized Solana connection to:', rpcUrl);
      return connection;
    } catch (error) {
      lastError = error as Error;
      console.warn(`Connection attempt ${retries + 1} failed:`, error);
      retries++;
      
      if (retries < MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * retries));
      }
    }
  }

  // If we've exhausted retries, try public RPC as last resort
  try {
    const publicRpcUrl = 'https://api.mainnet-beta.solana.com';
    connection = new Connection(publicRpcUrl, {
      commitment: 'confirmed',
      confirmTransactionInitialTimeout: 60000,
    });
    console.warn('Using public RPC endpoint as fallback');
    return connection;
  } catch (error) {
    console.error('Failed to initialize connection after all retries:', lastError);
    throw new Error('Failed to establish Solana connection after multiple attempts');
  }
};

export const getHeliusRpcUrl = async (): Promise<string> => {
  try {
    const response = await fetch('/api/get-helius-key', {
      headers: {
        'Cache-Control': 'no-cache',
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const apiKey = await response.text();
    if (!apiKey) {
      throw new Error('No API key received');
    }
    
    return `https://mainnet.helius-rpc.com/?api-key=${apiKey}`;
  } catch (error) {
    console.error('Error getting Helius API key:', error);
    throw error;
  }
};

// Helper to get current connection or initialize if needed
export const getConnection = async (): Promise<Connection> => {
  if (!connection) {
    return await initConnection();
  }
  return connection;
};

// Reset connection (useful for testing or when connection becomes stale)
export const resetConnection = () => {
  connection = null;
};

