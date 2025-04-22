
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ArrowDownIcon, RefreshCwIcon } from "lucide-react";

const SwapCard = () => {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Swap Tokens</CardTitle>
        <CardDescription>Exchange your tokens at the best rates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Select defaultValue="sol">
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Token" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sol">SOL</SelectItem>
                <SelectItem value="usdc">USDC</SelectItem>
                <SelectItem value="ape">APE</SelectItem>
                <SelectItem value="btc">BTC</SelectItem>
              </SelectContent>
            </Select>
            <Input 
              type="number" 
              placeholder="0.0" 
              className="flex-1"
            />
          </div>
          <div className="text-sm text-muted-foreground flex justify-between">
            <span>Balance: 0.00</span>
            <button className="text-apearmor-teal hover:underline">Max</button>
          </div>
        </div>
        
        <div className="flex justify-center my-2">
          <Button variant="ghost" size="icon" className="rounded-full border">
            <ArrowDownIcon className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Select defaultValue="usdc">
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Token" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sol">SOL</SelectItem>
                <SelectItem value="usdc">USDC</SelectItem>
                <SelectItem value="ape">APE</SelectItem>
                <SelectItem value="btc">BTC</SelectItem>
              </SelectContent>
            </Select>
            <Input 
              type="number" 
              placeholder="0.0" 
              className="flex-1"
              readOnly
            />
          </div>
          <div className="text-sm text-muted-foreground">
            <span>Balance: 0.00</span>
          </div>
        </div>
        
        <div className="bg-muted p-3 rounded-md space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Rate</span>
            <span>1 SOL = 69.42 USDC</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Slippage</span>
            <span>0.5%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Fee</span>
            <span>0.0001 SOL</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-apearmor-teal hover:bg-apearmor-teal/90 text-black font-semibold">
          Connect Wallet
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SwapCard;
