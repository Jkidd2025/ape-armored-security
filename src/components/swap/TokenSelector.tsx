
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Token, mockTokens } from "./mockData";

interface TokenSelectorProps {
  selectedToken: Token;
  onSelectToken: (token: Token) => void;
  otherToken: Token;
}

export const TokenSelector = ({ selectedToken, onSelectToken, otherToken }: TokenSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTokens = mockTokens.filter(
    (token) => 
      token.id !== otherToken.id && 
      (token.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
       token.symbol.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSelect = (token: Token) => {
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
        <img 
          src={selectedToken.logoURI} 
          alt={selectedToken.name} 
          className="w-5 h-5 rounded-full" 
        />
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
            {filteredTokens.map((token) => (
              <Button
                key={token.id}
                variant="ghost"
                className={`w-full justify-start ${
                  selectedToken.id === token.id ? "bg-apearmor-teal/10 text-apearmor-teal" : ""
                }`}
                onClick={() => handleSelect(token)}
              >
                <div className="flex items-center gap-3">
                  <img 
                    src={token.logoURI} 
                    alt={token.name} 
                    className="w-6 h-6 rounded-full" 
                  />
                  <div className="text-left">
                    <div>{token.symbol}</div>
                    <div className="text-xs text-muted-foreground">{token.name}</div>
                  </div>
                </div>
              </Button>
            ))}
            
            {filteredTokens.length === 0 && (
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
