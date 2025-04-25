
import { TokenInfo } from '@/services/solanaTracker';

// These will be replaced by real data from the API
export const mockTokens: TokenInfo[] = [
  {
    symbol: "SOL",
    name: "Solana",
    decimals: 9,
    mintAddress: "So11111111111111111111111111111111111111112",
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
    balance: 10.5,
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    decimals: 6,
    mintAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
    balance: 250.75,
  },
];

export const wallets = [
  {
    id: 'phantom',
    name: 'Phantom',
    iconUrl: '/lovable-uploads/2f4e2fac-0b35-40b7-8c24-4078d2e10589.png',
  },
  {
    id: 'solflare',
    name: 'Solflare',
    iconUrl: '/lovable-uploads/2f4e2fac-0b35-40b7-8c24-4078d2e10589.png',
  },
  {
    id: 'trust-wallet',
    name: 'Trust Wallet',
    iconUrl: '/lovable-uploads/2f4e2fac-0b35-40b7-8c24-4078d2e10589.png',
  }
];

// Mock tokens with balances
export const mockTokensWithBalance: TokenInfo[] = [
  {
    mintAddress: "So11111111111111111111111111111111111111112",
    name: "Solana",
    symbol: "SOL",
    decimals: 9,
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
    balance: 10.5,
  },
  {
    mintAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
    balance: 250.75,
  },
  {
    mintAddress: "7vfCXTUXx5WJV5JADk17vzaJZoGegVTd9nH6yrEqgAVU",
    name: "Ethereum",
    symbol: "ETH",
    decimals: 8,
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7vfCXTUXx5WJV5JADk17vzaJZoGegVTd9nH6yrEqgAVU/logo.png",
    balance: 1.25,
  },
  {
    mintAddress: "DezXAZ8z7PnzvnzKrkc6TzwjFedjEfKMffWjWNWCpJqx",
    name: "Bonk",
    symbol: "BONK",
    decimals: 5,
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DezXAZ8z7PnzvnzKrkc6TzwjFedjEfKMffWjWNWCpJqx/logo.png",
    balance: 1000000,
  },
];
