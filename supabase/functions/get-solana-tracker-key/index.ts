
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

serve(async (_req) => {
  const apiKey = Deno.env.get('SOLANA_TRACKER_API_KEY');
  
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key not found' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify(apiKey), {
    headers: { 'Content-Type': 'application/json' },
  });
});
