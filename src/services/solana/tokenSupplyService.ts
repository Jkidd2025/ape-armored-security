
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

// Hardcoded token data
const HARDCODED_TOKEN_DATA: TokenData = {
  name: "APE",
  address: "786Yz5T1yd9BzWMgWMCrPEB8WeGWAT1xyzwTNcKiKkJD",
  totalSupply: "1000000000000000000",
  symbol: "APE"
};

export const fetchTokenSupplyData = async (mintAddress: string): Promise<TokenSupplyResponse> => {
  try {
    console.log("Using hardcoded token supply data for:", mintAddress);
    
    // Return the hardcoded data
    return { 
      data: HARDCODED_TOKEN_DATA 
    };
  } catch (error) {
    console.error("Error with token supply data:", error);
    return { 
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
