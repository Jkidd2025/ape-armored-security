
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface TokenSupplyResponse {
  data?: {
    solana?: {
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
    }
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
    
    // Check if data has GraphQL errors
    if (data.errors) {
      console.error("GraphQL errors returned:", data.errors);
      throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
    }
    
    // Debug logging to understand the structure
    console.log("Full API response structure:", JSON.stringify(data));
    
    // Safely validate the data structure without causing any potential crashes
    const supplyUpdate = data?.data?.solana?.TokenSupplyUpdates?.[0]?.TokenSupplyUpdate?.[0];
    
    if (!supplyUpdate) {
      console.warn("Edge function returned unexpected data structure:", data);
      throw new Error("Invalid data format returned from API");
    }
    
    console.log("Token supply data received successfully");
    return data as TokenSupplyResponse;
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
