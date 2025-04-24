
export interface SwapSettings {
  slippage: number;
  deadline: number;
}

export interface SwapPair {
  fromToken: string;
  toToken: string;
  fromAmount: string;
  toAmount: string;
}

export interface SwapResult {
  success: boolean;
  txHash?: string;
  error?: string;
}

// Production additions
export interface TokenBalance {
  mint: string;
  balance: bigint;
  decimals: number;
}

export interface SwapQuote {
  inAmount: bigint;
  outAmount: bigint;
  fee: bigint;
  priceImpact: number;
  route: string[];
}

export interface SwapState {
  loading: boolean;
  approving: boolean;
  swapping: boolean;
  error: string | null;
  txHash: string | null;
}

export type SwapDirection = 'exactIn' | 'exactOut';
