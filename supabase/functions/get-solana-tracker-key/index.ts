
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const apiKey = Deno.env.get('SOLANA_TRACKER_API_KEY');
  
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key not found' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      },
    });
  }

  return new Response(JSON.stringify(apiKey), {
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders
    },
  });
});

