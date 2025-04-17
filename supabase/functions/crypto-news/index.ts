
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// API token is securely stored in Supabase secrets
const API_TOKEN = Deno.env.get("CRYPTO_NEWS_API_TOKEN");
const API_BASE_URL = "https://cryptonews-api.com/api/v1";

// CORS headers to allow requests from the frontend
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
    const { endpoint, params } = await req.json();
    
    // Validate the requested endpoint to ensure security
    if (!['category', 'topnews'].includes(endpoint)) {
      throw new Error('Invalid endpoint requested');
    }
    
    // Build the URL with the provided parameters
    let url = `${API_BASE_URL}/${endpoint}?`;
    
    // Add auth token
    url += `token=${API_TOKEN}`;
    
    // Add other parameters
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url += `&${key}=${value}`;
      });
    }
    
    console.log(`Requesting: ${endpoint} with params: ${JSON.stringify(params)}`);
    
    // Make the request to the Crypto News API
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Return the API response to the client
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error fetching crypto news:", error);
    
    // Return error response
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to fetch crypto news' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
