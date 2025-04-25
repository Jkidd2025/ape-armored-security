
import { TokenInfo } from '@/services/solanaTracker';

// These will be replaced by real data from the API
export const mockTokens: TokenInfo[] = [
  {
    symbol: "SOL",
    name: "Solana",
    decimals: 9,
    mintAddress: "So11111111111111111111111111111111111111112",
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111112/logo.png",
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
    iconUrl: 'https://raw.githubusercontent.com/solana-labs/wallet-adapter/master/packages/wallets/icons/phantom.png',
  },
  {
    id: 'solflare',
    name: 'Solflare',
    iconUrl: 'https://raw.githubusercontent.com/solana-labs/wallet-adapter/master/packages/wallets/icons/solflare.png',
  },
  {
    id: 'trust-wallet',
    name: 'Trust Wallet',
    iconUrl: 'https://trustwallet.com/assets/images/favicon.png',
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
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So1111111111111111111111111111111111111112/logo.png",
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
