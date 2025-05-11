
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

// CORS headers for browser access
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Mint address for APE token
const APE_TOKEN_ADDRESS = '786Yz5T1yd9BzWMgWMCrPEB8WeGWAT1xyzwTNcKiKkJD';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get API key from environment
    const apiKey = Deno.env.get('HELIUS_API_KEY');
    
    if (!apiKey) {
      throw new Error('HELIUS_API_KEY is not set in environment variables');
    }
    
    // Use Helius RPC endpoint with API key
    const rpcUrl = `https://mainnet.helius-rpc.com/?api-key=${apiKey}`;
    
    console.log("Getting token supply for:", APE_TOKEN_ADDRESS);
    
    // Use JSON-RPC method to fetch token supply
    const response = await fetch(rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: '1',
        method: 'getTokenSupply',
        params: [APE_TOKEN_ADDRESS]
      })
    });
    
    if (!response.ok) {
      console.error(`RPC request failed with status: ${response.status}`);
      throw new Error(`RPC request failed with status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log("Token supply raw data:", result);
    
    if (result.error) {
      console.error(`RPC error: ${JSON.stringify(result.error)}`);
      throw new Error(`RPC error: ${JSON.stringify(result.error)}`);
    }
    
    // Format and return the data
    const tokenSupply = result.result?.value;
    
    if (!tokenSupply) {
      throw new Error("Invalid token supply data received");
    }
    
    const responseData = {
      data: {
        name: "APE",
        address: APE_TOKEN_ADDRESS,
        totalSupply: tokenSupply.amount,
        decimals: tokenSupply.decimals,
        symbol: "APE"
      }
    };
    
    return new Response(JSON.stringify(responseData), {
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json' 
      },
    });
  } catch (error) {
    console.error("Error fetching token supply:", error);
    
    // Return fallback data in case of error
    const fallbackData = {
      data: {
        name: "APE",
        address: APE_TOKEN_ADDRESS,
        totalSupply: "1000000000000000000",
        decimals: 9,
        symbol: "APE"
      },
      error: error.message
    };
    
    return new Response(JSON.stringify(fallbackData), {
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json' 
      },
      status: 200, // Return 200 even for errors to ensure client gets fallback data
    });
  }
});
