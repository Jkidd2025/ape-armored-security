
export interface TokenInfo {
  symbol: string;
  address: string;
  decimals: number;
  logoURI?: string;
  name: string;
}

const JUPITER_V6_ENDPOINT = 'https://quote-api.jup.ag/v6';

export async function getTokensList(): Promise<TokenInfo[]> {
  try {
    const response = await fetch(`${JUPITER_V6_ENDPOINT}/tokens`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tokens:', error);
    return [];
  }
}

export async function getQuote(
  inputMint: string,
  outputMint: string,
  amount: number,
  slippageBps: number = 50 // default 0.5%
) {
  try {
    const params = new URLSearchParams({
      inputMint,
      outputMint,
      amount: amount.toString(),
      slippageBps: slippageBps.toString(),
    });

    const response = await fetch(`${JUPITER_V6_ENDPOINT}/quote?${params}`);
    return await response.json();
  } catch (error) {
    console.error('Error getting quote:', error);
    throw error;
  }
}
