
// Real Solana web3 implementation
import { Connection, PublicKey, Transaction } from '@solana/web3.js';

let connection: Connection;

export const initConnection = async () => {
  const rpcUrl = await getHeliusRpcUrl();
  connection = new Connection(rpcUrl, 'confirmed');
  console.log('Initialized real Solana connection to:', rpcUrl);
  return connection;
};

export const getHeliusRpcUrl = async (): Promise<string> => {
  try {
    const response = await fetch('/api/get-helius-key');
    const apiKey = await response.text();
    return `https://mainnet.helius-rpc.com/?api-key=${apiKey}`;
  } catch (error) {
    console.error('Error getting Helius API key:', error);
    return 'https://api.mainnet-beta.solana.com';
  }
};
