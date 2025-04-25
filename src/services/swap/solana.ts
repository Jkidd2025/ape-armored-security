
// Ensure Buffer is available
import '../utils/buffer-polyfill';

import { Connection, PublicKey } from '@solana/web3.js';
import { getHeliusRpcUrl } from '../helius/heliusService';

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
        confirmTransactionInitialTimeout: 60000,
      });

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

  // Fallback to public RPC
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

export const getConnection = async (): Promise<Connection> => {
  if (!connection) {
    return await initConnection();
  }
  return connection;
};

export const resetConnection = () => {
  connection = null;
};
