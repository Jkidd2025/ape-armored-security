
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CryptoRate {
  symbol: string;
  rate: number;
}

interface ConversionResult {
  from: string;
  to: string;
  amount: number;
  result: number;
}

const MarketDataDisplay = () => {
  const [rates, setRates] = useState<CryptoRate[]>([]);
  const [historicalRates, setHistoricalRates] = useState<CryptoRate[]>([]);
  const [cryptoList, setCryptoList] = useState<{[key: string]: any}>({});
  const [conversionResult, setConversionResult] = useState<ConversionResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Conversion form state
  const [fromCurrency, setFromCurrency] = useState('BTC');
  const [toCurrency, setToCurrency] = useState('ETH');
  const [amount, setAmount] = useState('1');

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        // Fetch current rates
        const { data: liveData } = await supabase.functions.invoke('market-data');
        
        if (liveData.rates) {
          const formattedRates = Object.entries(liveData.rates).map(([symbol, rate]) => ({
            symbol,
            rate: rate as number
          }));
          setRates(formattedRates);
        }

        // Fetch historical rates (7 days ago)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const dateString = sevenDaysAgo.toISOString().split('T')[0];
        
        const { data: historicalData } = await supabase.functions.invoke('market-data', {
          body: { endpoint: 'historical', date: dateString }
        });

        if (historicalData.rates) {
          const formattedHistorical = Object.entries(historicalData.rates).map(([symbol, rate]) => ({
            symbol,
            rate: rate as number
          }));
          setHistoricalRates(formattedHistorical);
        }

        // Fetch supported cryptocurrencies list
        const { data: listData } = await supabase.functions.invoke('market-data', {
          body: { endpoint: 'list' }
        });

        if (listData.crypto) {
          setCryptoList(listData.crypto);
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

  const handleConversion = async () => {
    try {
      const { data } = await supabase.functions.invoke('market-data', {
        body: {
          endpoint: 'convert',
          from: fromCurrency,
          to: toCurrency,
          amount: amount
        }
      });

      if (data.result) {
        setConversionResult({
          from: fromCurrency,
          to: toCurrency,
          amount: Number(amount),
          result: data.result
        });
      }
    } catch (err) {
      console.error('Error converting currencies:', err);
      setError('Failed to convert currencies');
    }
  };

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
        <CardTitle>Cryptocurrency Market Data</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="live" className="space-y-4">
          <TabsList>
            <TabsTrigger value="live">Live Rates</TabsTrigger>
            <TabsTrigger value="historical">7-Day Comparison</TabsTrigger>
            <TabsTrigger value="converter">Currency Converter</TabsTrigger>
          </TabsList>

          <TabsContent value="live">
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
          </TabsContent>

          <TabsContent value="historical">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Currency</TableHead>
                  <TableHead className="text-right">Current Price</TableHead>
                  <TableHead className="text-right">7 Days Ago</TableHead>
                  <TableHead className="text-right">Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rates.map((rate) => {
                  const historicalRate = historicalRates.find(h => h.symbol === rate.symbol);
                  const change = historicalRate 
                    ? ((rate.rate - historicalRate.rate) / historicalRate.rate * 100).toFixed(2)
                    : 'N/A';
                  
                  return (
                    <TableRow key={rate.symbol}>
                      <TableCell className="font-medium">{rate.symbol}</TableCell>
                      <TableCell className="text-right">${rate.rate.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        ${historicalRate?.rate.toLocaleString() ?? 'N/A'}
                      </TableCell>
                      <TableCell className={`text-right ${Number(change) > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {change !== 'N/A' ? `${change}%` : 'N/A'}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="converter" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="space-y-2">
                <label className="text-sm font-medium">From</label>
                <Select value={fromCurrency} onValueChange={setFromCurrency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(cryptoList).map((symbol) => (
                      <SelectItem key={symbol} value={symbol}>
                        {symbol}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">To</label>
                <Select value={toCurrency} onValueChange={setToCurrency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(cryptoList).map((symbol) => (
                      <SelectItem key={symbol} value={symbol}>
                        {symbol}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Amount</label>
                <div className="flex space-x-2">
                  <Input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="0"
                  />
                  <Button onClick={handleConversion}>Convert</Button>
                </div>
              </div>
            </div>

            {conversionResult && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-lg">
                  {conversionResult.amount} {conversionResult.from} = {' '}
                  <span className="font-bold">
                    {conversionResult.result.toLocaleString()} {conversionResult.to}
                  </span>
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MarketDataDisplay;
