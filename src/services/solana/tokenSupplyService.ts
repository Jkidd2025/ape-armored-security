
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
    // Use supabase client to invoke our edge function
    const { data, error } = await supabase.functions.invoke('solana-token-tracker', {
      body: { mintAddress }
    });
    
    if (error) {
      throw new Error(`Edge function error: ${error.message}`);
    }
    
    if (!data) {
      throw new Error("No data returned from the edge function");
    }
    
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
  
  // Convert to number and apply decimals
  const numericAmount = Number(amount) / Math.pow(10, decimals);
  
  // Format with commas for thousands separator
  return numericAmount.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};
