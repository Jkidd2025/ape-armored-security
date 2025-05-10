
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const SOLANA_TRACKER_API_KEY = "T3-t673yXqHzgZN2E2YmRNXIe1";
const API_ID = "2dee027e-6aca-457c-82ff-b48f0b852a39";

// CORS headers for browser access
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Extract mint address from request
    const url = new URL(req.url);
    const mintAddress = url.searchParams.get('mintAddress');

    if (!mintAddress) {
      throw new Error("Missing mintAddress parameter");
    }

    console.log(`Fetching token data for mint address: ${mintAddress}`);

    // Construct GraphQL query for token supply data
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
    const response = await fetch('https://api.solana-tracker.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SOLANA_TRACKER_API_KEY}`,
        'API-ID': API_ID,
      },
      body: JSON.stringify(graphqlQuery),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API error: ${response.status} - ${errorText}`);
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Successfully fetched token data:", JSON.stringify(data).slice(0, 200) + "...");
    
    return new Response(JSON.stringify(data), {
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json' 
      },
    });
  } catch (error) {
    console.error("Error in solana-token-tracker function:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "An unknown error occurred",
        status: "error"
      }),
      {
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
      }
    );
  }
});
