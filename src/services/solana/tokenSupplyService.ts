
import { useToast } from "@/components/ui/use-toast";

interface TokenData {
  name: string;
  address: string;
  totalSupply: string;
  symbol: string;
}

interface TokenSupplyResponse {
  data?: TokenData;
  error?: string;
}

// Fallback token data in case of API failure
const FALLBACK_TOKEN_DATA: TokenData = {
  name: "APE",
  address: "786Yz5T1yd9BzWMgWMCrPEB8WeGWAT1xyzwTNcKiKkJD",
  totalSupply: "1000000000000000000",
  symbol: "APE"
};

export const fetchTokenSupplyData = async (mintAddress: string): Promise<TokenSupplyResponse> => {
  try {
    console.log("Fetching token supply data for:", mintAddress);
    
    // Call our Supabase Edge Function
    const response = await fetch('/api/solana-token-tracker', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Token supply API response:", data);
    
    if (data.error) {
      console.warn("API returned an error:", data.error);
    }
    
    return data.data ? { data: data.data } : { data: FALLBACK_TOKEN_DATA, error: "No data returned from API" };
  } catch (error) {
    console.error("Error with token supply data:", error);
    return { 
      data: FALLBACK_TOKEN_DATA, 
      error: error instanceof Error ? error.message : "An unknown error occurred" 
    };
  }
};

// Utility function to format token amounts
export const formatTokenAmount = (amount: string | undefined, decimals: number = 9): string => {
  if (!amount) return "N/A";
  
  try {
    // Handle potential non-numeric values
    if (isNaN(Number(amount))) {
      console.warn(`Invalid amount value: ${amount}`);
      return "N/A";
    }
    
    // Convert to number and apply decimals
    const numericAmount = Number(amount) / Math.pow(10, decimals);
    
    // Format with commas for thousands separator
    return numericAmount.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  } catch (err) {
    console.error("Error formatting token amount:", err, "Amount:", amount);
    return "Error";
  }
};
