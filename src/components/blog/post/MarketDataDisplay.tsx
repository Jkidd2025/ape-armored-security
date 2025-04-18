
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface CryptoRate {
  symbol: string;
  rate: number;
}

const MarketDataDisplay = () => {
  const [rates, setRates] = useState<CryptoRate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('market-data');
        
        if (error) throw error;
        
        if (data.rates) {
          const formattedRates = Object.entries(data.rates).map(([symbol, rate]) => ({
            symbol,
            rate: rate as number
          }));
          setRates(formattedRates);
        }
      } catch (err) {
        console.error('Error fetching market data:', err);
        setError('Failed to load market data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-destructive">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Live Cryptocurrency Rates</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Currency</TableHead>
              <TableHead className="text-right">Price (USD)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rates.map((rate) => (
              <TableRow key={rate.symbol}>
                <TableCell className="font-medium">{rate.symbol}</TableCell>
                <TableCell className="text-right">${rate.rate.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MarketDataDisplay;
