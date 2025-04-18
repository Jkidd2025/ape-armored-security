
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const COINLAYER_API_KEY = Deno.env.get('COINLAYER_API_KEY');
const API_BASE_URL = "http://api.coinlayer.com";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const endpoint = url.searchParams.get('endpoint') || 'live';
    const date = url.searchParams.get('date');
    const from = url.searchParams.get('from');
    const to = url.searchParams.get('to');
    const amount = url.searchParams.get('amount');

    let apiUrl = `${API_BASE_URL}`;
    
    switch (endpoint) {
      case 'historical':
        if (!date) throw new Error('Date parameter required for historical data');
        apiUrl += `/${date}?access_key=${COINLAYER_API_KEY}&symbols=BTC,ETH,BNB,XRP,ADA`;
        break;
      case 'list':
        apiUrl += `/list?access_key=${COINLAYER_API_KEY}`;
        break;
      case 'convert':
        if (!from || !to || !amount) throw new Error('From, to, and amount parameters required for conversion');
        apiUrl += `/convert?access_key=${COINLAYER_API_KEY}&from=${from}&to=${to}&amount=${amount}`;
        break;
      default:
        apiUrl += `/live?access_key=${COINLAYER_API_KEY}&symbols=BTC,ETH,BNB,XRP,ADA`;
    }
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`Fetched ${endpoint} data:`, data);
    
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(`Error fetching ${error.message}:`, error);
    
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to fetch data' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
