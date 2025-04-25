
export const mockPriceData = {
  'SOL': 155.42,
  'USDC': 1.00,
  'ETH': 3400.00,
  'BONK': 0.00001842,
  'USDT': 1.00,
  'RAY': 0.35,
  'JUP': 0.58,
  'PYTH': 0.76,
} as const;

export const getTokenPrice = async (tokenSymbol: string): Promise<number> => {
  return mockPriceData[tokenSymbol as keyof typeof mockPriceData] || 1.0;
};
