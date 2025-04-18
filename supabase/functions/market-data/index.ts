
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const COINLAYER_API_KEY = Deno.env.get('COINLAYER_API_KEY');
const API_BASE_URL = "http://api.coinlayer.com";

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
    // Fetch live cryptocurrency rates
    const response = await fetch(`${API_BASE_URL}/live?access_key=${COINLAYER_API_KEY}&symbols=BTC,ETH,BNB,XRP,ADA`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Fetched market data:', data);
    
    // Return the API response to the client
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error fetching market data:", error);
    
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to fetch market data' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
