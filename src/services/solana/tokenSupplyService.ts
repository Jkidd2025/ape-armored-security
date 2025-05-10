
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
    console.log("Fetching token supply data for: ", mintAddress);
    
    // Use supabase client to invoke our edge function
    const { data, error } = await supabase.functions.invoke('solana-token-tracker', {
      body: { mintAddress }
    });
    
    if (error) {
      console.error("Supabase function invocation error:", error);
      throw new Error(`Edge function error: ${error.message}`);
    }
    
    if (!data) {
      console.warn("No data returned from the edge function");
      throw new Error("No data returned from the edge function");
    }
    
    // Check if the response contains an error field
    if (data.error) {
      console.error("Edge function returned an error:", data.error);
      throw new Error(`API error: ${data.error}`);
    }
    
    // Verify that the response contains the expected data structure
    if (!data.data?.Solana?.TokenSupplyUpdates?.[0]?.TokenSupplyUpdate?.[0]) {
      console.warn("Edge function returned unexpected data structure:", data);
      throw new Error("Invalid data format returned from API");
    }
    
    console.log("Token supply data received:", data);
    return { data };
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
  
  try {
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
