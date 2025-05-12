
import { useQuery } from '@tanstack/react-query';

interface Transaction {
  hash: string;
  type: string; // "Buy" | "Sell" | "Transfer"
  amount: number;
  valueUsd: number;
  timestamp: number;
}

export const useTransactionHistory = () => {
  return useQuery({
    queryKey: ['transactionHistory'],
    queryFn: async (): Promise<Transaction[]> => {
      // In the future, replace with actual API call to token terminal or your backend
      console.log('Fetching transaction history...');
      
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
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
          ]);
        }, 1500);
      });
    },
    staleTime: 60 * 1000, // 1 minute
    refetchInterval: 60 * 1000, // refresh every minute
  });
};
