
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
    // For demonstration, we're using the Solana Tracker API endpoint
    // In a real-world scenario, this would be configured with proper headers and authentication
    const response = await fetch('/api/get-solana-tracker-key', {
      headers: {
        'Cache-Control': 'no-cache',
      }
    });
    
    if (!response.ok) {
      throw new Error(`Could not fetch API key: ${response.status}`);
    }
    
    const apiKey = await response.text();
    
    // The GraphQL query to fetch token supply data
    const graphqlQuery = {
      query: `{
        Solana {
          TokenSupplyUpdates(
            limit:{count:1}
            orderBy:{descending:Block_Time}
            where: {TokenSupplyUpdate: {Currency: {MintAddress: {is: "${mintAddress}"}}}}
          ) {
            TokenSupplyUpdate {
              Amount
              Currency {
                MintAddress
                Name
              }
              PreBalance
              PostBalance
            }
          }
        }
      }`
    };
    
    // Execute the GraphQL query
    const supplyResponse = await fetch('https://api.solana-tracker.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(graphqlQuery),
    });
    
    if (!supplyResponse.ok) {
      throw new Error(`API request failed: ${supplyResponse.status}`);
    }
    
    const data = await supplyResponse.json();
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
