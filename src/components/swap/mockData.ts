
export interface Token {
  id: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  price: number;
  balance: number;
}

export const mockTokens: Token[] = [
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    decimals: 9,
    logoURI: "https://cryptologos.cc/logos/solana-sol-logo.png",
    price: 140.23,
    balance: 12.45,
  },
  {
    id: "usdc",
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    logoURI: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
    price: 1.00,
    balance: 1235.67,
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
    logoURI: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    price: 3285.42,
    balance: 0.52,
  },
  {
    id: "bnb",
    name: "Binance Coin",
    symbol: "BNB",
    decimals: 18,
    logoURI: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
    price: 585.30,
    balance: 2.34,
  },
  {
    id: "avalanche",
    name: "Avalanche",
    symbol: "AVAX",
    decimals: 18,
    logoURI: "https://cryptologos.cc/logos/avalanche-avax-logo.png",
    price: 35.67,
    balance: 18.9,
  },
  {
    id: "polkadot",
    name: "Polkadot",
    symbol: "DOT",
    decimals: 10,
    logoURI: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png",
    price: 7.23,
    balance: 45.8,
  },
  {
    id: "cardano",
    name: "Cardano",
    symbol: "ADA",
    decimals: 6,
    logoURI: "https://cryptologos.cc/logos/cardano-ada-logo.png",
    price: 0.45,
    balance: 320.5,
  },
  {
    id: "ape",
    name: "ApeCoin",
    symbol: "APE",
    decimals: 18,
    logoURI: "https://cryptologos.cc/logos/apecoin-ape-logo.png",
    price: 1.35,
    balance: 150.0,
  }
];

export interface Wallet {
  id: string;
  name: string;
  iconUrl: string;
}

export const wallets: Wallet[] = [
  {
    id: "phantom",
    name: "Phantom",
    iconUrl: "https://phantom.app/favicon.ico",
  },
  {
    id: "solflare",
    name: "Solflare",
    iconUrl: "https://solflare.com/favicon.ico",
  },
  {
    id: "metamask",
    name: "MetaMask",
    iconUrl: "https://metamask.io/images/favicon.png",
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    iconUrl: "https://walletconnect.org/walletconnect-logo.png",
  },
];
