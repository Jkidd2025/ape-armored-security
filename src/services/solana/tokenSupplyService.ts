
import { useToast } from "@/components/ui/use-toast";

interface TokenSupplyResponse {
  data?: {
    Solana?: {
      TokenSupplyUpdates?: {
        TokenSupplyUpdate?: {
          Amount: string;
          Currency: {
            MintAddress: string;
            Name: string;
          };
          PreBalance: string;
          PostBalance: string;
        }[];
      }[];
    };
  };
  error?: string;
}

export const fetchTokenSupplyData = async (mintAddress: string): Promise<TokenSupplyResponse> => {
  try {
    // Using our secure edge function to fetch the token data
    const response = await fetch(`/api/solana-token-tracker?mintAddress=${mintAddress}`, {
      headers: {
        'Cache-Control': 'no-cache',
      }
    });
    
    if (!response.ok) {
      throw new Error(`Could not fetch token data: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }
    
    return { data: data };
  } catch (error) {
    console.error("Error fetching token supply data:", error);
    return { 
      error: error instanceof Error ? error.message : "An unknown error occurred" 
    };
  }
};

// Utility function to format token amounts
export const formatTokenAmount = (amount: string | undefined, decimals: number = 9): string => {
  if (!amount) return "N/A";
  
  // Convert to number and apply decimals
  const numericAmount = Number(amount) / Math.pow(10, decimals);
  
  // Format with commas for thousands separator
  return numericAmount.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};
