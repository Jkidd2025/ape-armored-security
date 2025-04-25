
// Handles Helius RPC URL and connection management
export const getHeliusRpcUrl = async (): Promise<string> => {
  try {
    const response = await fetch('/api/get-helius-key', {
      headers: {
        'Cache-Control': 'no-cache',
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const apiKey = await response.text();
    if (!apiKey) {
      throw new Error('No API key received');
    }
    
    return `https://mainnet.helius-rpc.com/?api-key=${apiKey}`;
  } catch (error) {
    console.error('Error getting Helius API key:', error);
    throw error;
  }
};
