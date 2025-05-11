
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { Connection, PublicKey } from 'https://cdn.skypack.dev/@solana/web3.js';

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
    // Use Helius RPC endpoint
    const rpcUrl = 'https://emelda-fkxk1k-fast-mainnet.helius-rpc.com';
    const connection = new Connection(rpcUrl);
    const mintAddress = new PublicKey(APE_TOKEN_ADDRESS);
    
    console.log("Getting token supply for:", APE_TOKEN_ADDRESS);
    
    // Fetch token supply data
    const tokenSupply = await connection.getTokenSupply(mintAddress);
    
    console.log("Token supply data:", tokenSupply);
    
    // Format and return the data
    const responseData = {
      data: {
        name: "APE",
        address: APE_TOKEN_ADDRESS,
        totalSupply: tokenSupply.value.amount,
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
        symbol: "APE"
      },
      error: error.message
    };
    
    return new Response(JSON.stringify(fallbackData), {
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json' 
      },
    });
  }
});
