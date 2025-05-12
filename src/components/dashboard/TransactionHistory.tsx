
import { useTransactionHistory } from "@/hooks/useTransactionHistory";
import { Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

const TransactionHistory = () => {
  const { data: transactions, isLoading, error } = useTransactionHistory();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <Activity className="mr-2 h-5 w-5 text-apearmor-teal" /> 
          Recent Transactions
        </CardTitle>
        <CardDescription>
          Latest token transfers and swaps
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            Array(5).fill(0).map((_, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex flex-col space-y-1">
                  <Skeleton className="h-5 w-[200px]" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
                <Skeleton className="h-6 w-[80px]" />
              </div>
            ))
          ) : error ? (
            <div className="p-3 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-md text-sm text-red-800 dark:text-red-300">
              Error loading transactions. Please try again later.
            </div>
          ) : (
            (transactions || sampleTransactions).map((tx, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <div className="flex items-center">
                    <div className="font-medium truncate max-w-[180px] md:max-w-[250px]">{formatAddress(tx.hash)}</div>
                    <Badge variant={getTxTypeBadgeVariant(tx.type)} className="ml-2">
                      {tx.type}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {new Date(tx.timestamp).toLocaleString()} • {tx.amount.toLocaleString()} APE
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-sm">
                  <div className={`${tx.type === 'Sell' ? 'text-red-500' : 'text-green-500'}`}>
                    {tx.type === 'Sell' ? '-' : '+'}${tx.valueUsd.toLocaleString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-apearmor-teal hover:underline">
            View all transactions
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

function formatAddress(address: string): string {
  return address.substring(0, 6) + '...' + address.substring(address.length - 4);
}

function getTxTypeBadgeVariant(type: string): "default" | "secondary" | "destructive" | "outline" {
  switch (type) {
    case 'Buy':
      return "default";
    case 'Sell':
      return "destructive";
    case 'Transfer':
      return "secondary";
    default:
      return "outline";
  }
}

// Sample data until we integrate with real API
const sampleTransactions = [
  {
    hash: "0x1c88d4672840c9d0b1aef5eb5ea0f6cd86de60dbe9c75b3e3cf06ae57a31cds1",
    type: "Buy",
    amount: 25000,
    valueUsd: 18.75,
    timestamp: Date.now() - 1000 * 60 * 15,
  },
  {
    hash: "0x37e8f31496619e2f3b9c3916805d0bf4af4a4026d9a41d243c022ced97539e63",
    type: "Transfer",
    amount: 13750,
    valueUsd: 10.31,
    timestamp: Date.now() - 1000 * 60 * 45,
  },
  {
    hash: "0x8ecad0d99347989c1ba6ebe6ca8911129cd925d66e42afed59a36f2d390fe3b9",
    type: "Sell",
    amount: 52000,
    valueUsd: 39.00,
    timestamp: Date.now() - 1000 * 60 * 120,
  },
  {
    hash: "0x4a84cdafe3158eed6511a3c0a1aef31b1e54e132d988f956e508cacad3bb5803",
    type: "Buy",
    amount: 104000,
    valueUsd: 78.00,
    timestamp: Date.now() - 1000 * 60 * 180,
  },
  {
    hash: "0x9e54d3ace044bd26c2c3ea0ccff58df165104672994c0b51bf89284692454503",
    type: "Transfer",
    amount: 7500,
    valueUsd: 5.63,
    timestamp: Date.now() - 1000 * 60 * 240,
  }
];

export default TransactionHistory;
