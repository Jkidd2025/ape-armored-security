
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useTokensWithPrices } from "@/hooks/useTokens";
import { TokenInfo } from "@/services/solanaTracker";
import { Skeleton } from "@/components/ui/skeleton";

interface TokenSelectorProps {
  selectedToken: TokenInfo;
  onSelectToken: (token: TokenInfo) => void;
  otherToken: TokenInfo;
}

export const TokenSelector = ({ selectedToken, onSelectToken, otherToken }: TokenSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { tokens, isLoading } = useTokensWithPrices();

  const filteredTokens = tokens?.filter(
    (token) => 
      token.mintAddress !== otherToken.mintAddress && 
      (token.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
       token.symbol.toLowerCase().includes(searchQuery.toLowerCase()))
  ) || [];

  const handleSelect = (token: TokenInfo) => {
    onSelectToken(token);
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-muted border-apearmor-darkbronze hover:bg-apearmor-darkbronze/20"
      >
        {selectedToken.logoURI && (
          <img 
            src={selectedToken.logoURI} 
            alt={selectedToken.name} 
            className="w-5 h-5 rounded-full" 
          />
        )}
        <span>{selectedToken.symbol}</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md bg-background border border-apearmor-darkbronze">
          <DialogHeader>
            <DialogTitle>Select a token</DialogTitle>
          </DialogHeader>
          
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by token name or symbol"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted border-apearmor-darkbronze"
            />
          </div>
          
          <div className="max-h-[300px] overflow-y-auto space-y-1">
            {isLoading ? (
              Array(5).fill(0).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-2">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-3 w-24 mt-1" />
                  </div>
                </div>
              ))
            ) : (
              filteredTokens.map((token) => (
                <Button
                  key={token.mintAddress}
                  variant="ghost"
                  className={`w-full justify-start ${
                    selectedToken.mintAddress === token.mintAddress ? "bg-apearmor-teal/10 text-apearmor-teal" : ""
                  }`}
                  onClick={() => handleSelect(token)}
                >
                  <div className="flex items-center gap-3">
                    {token.logoURI && (
                      <img 
                        src={token.logoURI} 
                        alt={token.name} 
                        className="w-6 h-6 rounded-full" 
                      />
                    )}
                    <div className="text-left">
                      <div>{token.symbol}</div>
                      <div className="text-xs text-muted-foreground">{token.name}</div>
                      {token.price && (
                        <div className="text-xs text-muted-foreground">
                          ${token.price.toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>
                </Button>
              ))
            )}
            
            {!isLoading && filteredTokens.length === 0 && (
              <div className="text-center py-6 text-muted-foreground">
                No tokens found
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
