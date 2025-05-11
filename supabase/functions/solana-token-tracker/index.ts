
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

// CORS headers for browser access
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Mock data since we're removing the API integration
const mockTokenData = {
  data: {
    name: "APE",
    address: "786Yz5T1yd9BzWMgWMCrPEB8WeGWAT1xyzwTNcKiKkJD",
    totalSupply: "1000000000000000000",
    symbol: "APE"
  }
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  console.log("Token data request received - returning static data");
  
  // Simply return the mock data
  return new Response(JSON.stringify(mockTokenData), {
    headers: { 
      ...corsHeaders, 
      'Content-Type': 'application/json' 
    },
  });
});
