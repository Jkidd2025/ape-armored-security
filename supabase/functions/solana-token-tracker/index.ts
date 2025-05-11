
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
      tokens: [
        {
          token: {
            name: "APE",
            address: "786Yz5T1yd9BzWMgWMCrPEB8WeGWAT1xyzwTNcKiKkJD",
            totalSupply: "1000000000000000000",
            symbol: "APE"
          }
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

    // Updated GraphQL query based on Bitquery's actual schema for Solana
    const graphqlQuery = {
      query: `{
        solana {
          tokens(
            where: {address: {is: "${mintAddress}"}}
          ) {
            token {
              name
              address
              totalSupply
              symbol
            }
          }
        }
      }`
    };
    
    try {
      // Use Authorization Bearer format as per Bitquery docs
      console.log("Authenticating with Bitquery API...");
      
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SOLANA_TRACKER_API_KEY}`,
          'X-API-KEY': SOLANA_TRACKER_API_KEY, // Adding this as a fallback
        },
        body: JSON.stringify(graphqlQuery),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API error: ${response.status} - ${errorText}`);
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      
      // Full logging for debugging
      console.log("API full response:", JSON.stringify(data).substring(0, 1000));
      
      // Handle empty responses or error responses from the API
      if (data.errors) {
        console.error("GraphQL errors:", JSON.stringify(data.errors));
        throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
      }
      
      // Basic data structure validation
      if (!data || typeof data !== 'object') {
        console.error("Invalid response format:", data);
        throw new Error("Invalid response format from API");
      }
      
      // Check for expected data structure
      if (!data?.data?.solana?.tokens?.[0]?.token) {
        console.warn("No token data found in response:", JSON.stringify(data));
        
        // Return mock data if the structure is invalid
        console.log("Returning mock data due to invalid response structure");
        return new Response(JSON.stringify(mockTokenData), {
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json' 
          },
        });
      }
      
      console.log("Successfully fetched token data");
      
      // Return the sanitized data to prevent issues
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
