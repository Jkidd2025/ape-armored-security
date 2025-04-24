
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
