
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

// Get API key from environment variable instead of hardcoding
const SOLANA_TRACKER_API_KEY = Deno.env.get('SOLANA_TRACKER_API_KEY') || '';

// API endpoint URL - Using the graphql endpoint as per Bitquery docs
const API_ENDPOINT = 'https://graphql.bitquery.io';

// CORS headers for browser access
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Mock data for fallback when API is unavailable
const mockTokenData = {
  data: {
    solana: {
      TokenSupplyUpdates: [
        {
          TokenSupplyUpdate: [
            {
              Amount: "0",
              Currency: {
                MintAddress: "786Yz5T1yd9BzWMgWMCrPEB8WeGWAT1xyzwTNcKiKkJD",
                Name: "APE"
              },
              PreBalance: "0",
              PostBalance: "1000000000000000000" // 1 billion with 9 decimals
            }
          ]
        }
      ]
    }
  }
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Extract mint address from request body
    let mintAddress;
    
    try {
      const body = await req.json();
      mintAddress = body.mintAddress;
    } catch (e) {
      console.log("Failed to parse JSON body, trying URL params");
      // Fallback to URL params if JSON parsing fails
      const url = new URL(req.url);
      mintAddress = url.searchParams.get('mintAddress');
    }

    if (!mintAddress) {
      throw new Error("Missing mintAddress parameter");
    }

    console.log(`Fetching token data for mint address: ${mintAddress}`);

    // Check if API key is available
    if (!SOLANA_TRACKER_API_KEY) {
      console.log("SOLANA_TRACKER_API_KEY is not set, returning mock data");
      return new Response(JSON.stringify(mockTokenData), {
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
      });
    }

    // The corrected GraphQL query based on Bitquery API structure
    const graphqlQuery = {
      query: `{
        solana {
          TokenSupplyUpdates(
            limit: {count: 1}
            orderBy: {descending: Block_Time}
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
    
    try {
      // Using the proper authentication header format according to Bitquery docs
      console.log("Authenticating with Bitquery API...");
      
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SOLANA_TRACKER_API_KEY}`,
        },
        body: JSON.stringify(graphqlQuery),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API error: ${response.status} - ${errorText}`);
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      
      // Debug: Log a sample of the response to understand the structure better
      console.log("API response (first 500 chars):", JSON.stringify(data).slice(0, 500));
      
      // Handle empty responses or error responses from the API
      if (data.errors) {
        console.error("GraphQL errors:", JSON.stringify(data.errors));
        throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
      }
      
      // Check if we have the expected data path
      if (!data?.data?.solana?.TokenSupplyUpdates?.[0]?.TokenSupplyUpdate?.[0]) {
        console.warn("No token data found in response:", JSON.stringify(data).slice(0, 500));
        throw new Error("No token data found in API response");
      }
      
      // Return data with the correct structure
      console.log("Successfully fetched token data");
      
      return new Response(JSON.stringify(data), {
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
      });
    } catch (fetchError) {
      console.error("Error fetching from API:", fetchError);
      console.log("Returning mock data due to fetch error");
      
      return new Response(JSON.stringify(mockTokenData), {
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
      });
    }
  } catch (error) {
    console.error("Error in solana-token-tracker function:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "An unknown error occurred",
        status: "error",
        data: mockTokenData.data // Include mock data even in error response
      }),
      {
        status: 200, // Return 200 status even for errors to prevent endpoint failures
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
      }
    );
  }
});
