
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Copy, ExternalLink, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const TokenUtility = () => {
  const [copied, setCopied] = useState(false);
  const contractAddress = "786Yz5T1yd9BzWMgWMCrPEB8WeGWAT1xyzwTNcKiKkJD";
  
  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mt-6 mb-3">5.1 Token Utility</h3>
      
      <Alert className="mb-6 bg-gradient-to-r from-apearmor-teal/20 to-apearmor-gold/20 border-apearmor-teal border-2 shadow-lg">
        <div className="py-2">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-center space-x-2">
              <Badge className="bg-apearmor-gold text-black px-3 py-1 text-xs">LIVE</Badge>
              <AlertDescription className="text-xl font-bold text-apearmor-gold">
                APE TOKEN NOW ON SOLANA
              </AlertDescription>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 bg-background/80 p-2 rounded-md">
              <div className="font-mono text-xs sm:text-sm overflow-hidden text-ellipsis whitespace-nowrap flex-1 text-center sm:text-left">
                {contractAddress}
              </div>
              
              <div className="flex gap-2 flex-shrink-0">
                <Button 
                  size="sm" 
                  className="bg-apearmor-teal hover:bg-apearmor-teal/80 text-black"
                  onClick={handleCopy}
                >
                  {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                  {copied ? "Copied!" : "Copy"}
                </Button>
                
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-apearmor-gold text-apearmor-gold hover:bg-apearmor-gold/10"
                  asChild
                >
                  <a 
                    href={`https://solscan.io/token/${contractAddress}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Alert>
      
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li><strong>Protection Eligibility:</strong> Minimum token holdings are required for each protection package</li>
        <li><strong>Governance:</strong> Token holders can participate in community governance decisions</li>
        <li><strong>Fee Reduction:</strong> Holding tokens reduces service fees</li>
      </ul>
    </div>
  );
};

export default TokenUtility;
