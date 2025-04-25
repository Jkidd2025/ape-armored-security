
import { Connection, PublicKey } from '@solana/web3.js';
import { getConnection } from './solana';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

export const getTokenBalance = async (
  walletProvider: any,
  tokenSymbol: string
): Promise<{ amount: string; decimals: number }> => {
  try {
    if (!walletProvider || !walletProvider.isConnected) {
      console.warn("Cannot get token balance: wallet not connected");
      return { amount: '0', decimals: 9 };
    }
    
    if (!walletProvider.publicKey) {
      console.warn("Cannot get token balance: no public key available");
      return { amount: '0', decimals: 9 };
    }

    console.log(`Getting ${tokenSymbol} balance for wallet ${walletProvider.publicKey.toString()}`);
    
    const connection = await getConnection();
    const publicKey = new PublicKey(walletProvider.publicKey.toString());

    // Handle native SOL separately
    if (tokenSymbol === 'SOL') {
      try {
        const balance = await connection.getBalance(publicKey);
        const solBalance = balance / 1e9; // Convert lamports to SOL
        console.log(`SOL balance: ${solBalance}`);
        return { amount: solBalance.toString(), decimals: 9 };
      } catch (error) {
        console.error('Error getting SOL balance:', error);
        return { amount: '0', decimals: 9 };
      }
    }
    
    // For SPL tokens, we need the mint addresses
    const tokenMintAddresses: Record<string, string> = {
      'USDC': 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      'USDT': 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
      'ETH': '7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs', // Solana-wrapped ETH
      'BONK': 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
      'RAY': '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
      'JUP': 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
      'PYTH': 'HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3',
    };
    
    const mintAddress = tokenMintAddresses[tokenSymbol];
    if (!mintAddress) {
      console.warn(`No mint address configured for token: ${tokenSymbol}`);
      return { amount: '0', decimals: 9 };
    }
    
    try {
      // Get all token accounts owned by the wallet
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        publicKey,
        { programId: TOKEN_PROGRAM_ID }
      );
      
      console.log(`Found ${tokenAccounts.value.length} token accounts for wallet`);
      
      // Find the account for the requested token
      const tokenAccount = tokenAccounts.value.find((account) => {
        const tokenData = account.account.data.parsed.info;
        return tokenData.mint === mintAddress;
      });
      
      if (tokenAccount) {
        const tokenData = tokenAccount.account.data.parsed.info;
        const balance = tokenData.tokenAmount;
        
        console.log(`${tokenSymbol} balance: ${balance.uiAmount} (${balance.amount} raw)`);
        
        return {
          amount: balance.uiAmountString || balance.uiAmount.toString(),
          decimals: balance.decimals
        };
      } else {
        console.log(`No account found for ${tokenSymbol} (${mintAddress})`);
        return { amount: '0', decimals: getDecimalsForToken(tokenSymbol) };
      }
    } catch (error) {
      console.error(`Error getting ${tokenSymbol} balance:`, error);
      return { amount: '0', decimals: getDecimalsForToken(tokenSymbol) };
    }
  } catch (error) {
    console.error('Error getting token balance:', error);
    return { amount: '0', decimals: 9 };
  }
};

// Helper function to get token decimals
function getDecimalsForToken(symbol: string): number {
  const tokenDecimals: Record<string, number> = {
    'SOL': 9,
    'USDC': 6,
    'USDT': 6,
    'ETH': 8,
    'BONK': 5,
    'RAY': 6,
    'JUP': 6,
    'PYTH': 6
  };
  
  return tokenDecimals[symbol] || 9;
}
