import { TokenInfo } from '@/services/solanaTracker';

// These will be replaced by real data from the API
export const mockTokens: TokenInfo[] = [
  {
    symbol: "SOL",
    name: "Solana",
    decimals: 9,
    mintAddress: "So11111111111111111111111111111111111111112",
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    decimals: 6,
    mintAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
  },
];

export interface Token {
  id: string;
  name: string;
  symbol: string;
  logoURI: string;
  balance: number;
}

export const wallets = [
  {
    id: "phantom",
    name: "Phantom",
    iconUrl: "/phantom.png",
  },
  {
    id: "solflare",
    name: "Solflare",
    iconUrl: "/solflare.png",
  },
  {
    id: "trustwallet",
    name: "Trust Wallet",
    iconUrl: "/trustwallet.png",
  },
];

// Mock tokens with balances
export const mockTokensWithBalance: Token[] = [
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
    balance: 10.5,
  },
  {
    id: "usd-coin",
    name: "USD Coin",
    symbol: "USDC",
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
    balance: 250.75,
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7vfCXTUXx5WJV5JADk17vzaJZoGegVTd9nH6yrEqgAVU/logo.png",
    balance: 1.25,
  },
  {
    id: "bonk",
    name: "Bonk",
    symbol: "BONK",
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DezXAZ8z7PnzvnzKrkc6TzwjFedjEfKMffWjWNWCpJqx/logo.png",
    balance: 1000000,
  },
];
