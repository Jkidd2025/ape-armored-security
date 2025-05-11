
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, ExternalLink } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { fetchTokenSupplyData, formatTokenAmount } from "@/services/solana/tokenSupplyService";
import { Skeleton } from "@/components/ui/skeleton";

const TotalSupplyCheck = () => {
  const [supplyData, setSupplyData] = useState<{
    totalSupply?: string;
    circulatingSupply?: string;
    tokenName?: string;
    lastUpdated?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const contractAddress = "786Yz5T1yd9BzWMgWMCrPEB8WeGWAT1xyzwTNcKiKkJD";

  const fetchSupplyData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      toast({
        title: "Updating supply data...",
        description: "Fetching the latest token information",
      });
      
      const response = await fetchTokenSupplyData(contractAddress);
      
      if (response.error) {
        console.warn("Warning while fetching supply data:", response.error);
        // Show warning but continue with the data we have
      }
      
      if (response.data) {
        // Get decimals from API or use default
        const decimals = response.data.decimals || 9;
        
        // Calculate circulating supply as 72% of total supply
        const totalSupply = response.data.totalSupply;
        const circulatingSupplyValue = Math.floor(Number(totalSupply) * 0.72).toString();
        
        setSupplyData({
          totalSupply: formatTokenAmount(totalSupply, decimals),
          circulatingSupply: formatTokenAmount(circulatingSupplyValue, decimals),
          tokenName: response.data.symbol,
          lastUpdated: new Date().toLocaleString(),
        });
        
        toast({
          title: "Supply data updated",
          description: "Latest token supply information has been loaded",
        });
      } else {
        throw new Error("No data received");
      }
    } catch (err) {
      console.error("Error updating supply data:", err);
      setError("Failed to update supply information. Using estimated values.");
      
      // Set fallback data
      setSupplyData({
        totalSupply: "1,000,000,000",
        circulatingSupply: "720,000,000",
        tokenName: "APE",
        lastUpdated: new Date().toLocaleString() + " (estimated)",
      });
      
      toast({
        variant: "destructive",
        title: "Error fetching data",
        description: "Could not retrieve current token supply information",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data on first load
  useEffect(() => {
    fetchSupplyData();
  }, []);

  return (
    <div className="mt-4 mb-6">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-md font-semibold">Token Supply</h4>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={fetchSupplyData} 
          disabled={isLoading}
          className="flex items-center gap-1"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          {isLoading ? "Updating..." : "Refresh"}
        </Button>
      </div>
      
      {error && (
        <Alert variant="destructive" className="mb-2">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="bg-muted/50 p-4 rounded-md border">
        <div className="grid grid-cols-2 gap-2">
          <div className="text-sm">Total Supply:</div>
          <div className="text-sm font-semibold text-right">
            {isLoading ? (
              <Skeleton className="h-5 w-24 ml-auto" />
            ) : (
              <>
                {supplyData.totalSupply || "N/A"} {supplyData.tokenName}
              </>
            )}
          </div>
          
          <div className="text-sm">Circulating Supply:</div>
          <div className="text-sm font-semibold text-right">
            {isLoading ? (
              <Skeleton className="h-5 w-24 ml-auto" />
            ) : (
              <>
                {supplyData.circulatingSupply || "N/A"} {supplyData.tokenName}
              </>
            )}
          </div>
          
          <div className="text-sm col-span-2 mt-2 text-xs text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>
                {isLoading ? (
                  <Skeleton className="h-4 w-40" />
                ) : (
                  <>Last updated: {supplyData.lastUpdated || "Never"}</>
                )}
              </span>
              <a 
                href={`https://solscan.io/token/${contractAddress}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-apearmor-teal hover:underline"
              >
                View on Solscan
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalSupplyCheck;
