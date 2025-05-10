
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, ExternalLink } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { fetchTokenSupplyData, formatTokenAmount } from "@/services/solana/tokenSupplyService";

const TotalSupplyCheck = () => {
  const [supplyData, setSupplyData] = useState<{
    totalSupply?: string;
    circulatingSupply?: string;
    tokenName?: string;
    lastUpdated?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const contractAddress = "786Yz5T1yd9BzWMgWMCrPEB8WeGWAT1xyzwTNcKiKkJD";
  const [retryCount, setRetryCount] = useState(0);

  const fetchSupplyData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      toast({
        title: "Requesting supply data...",
        description: "Fetching the latest token supply information",
      });
      
      const result = await fetchTokenSupplyData(contractAddress);
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      // Updated to use the new API response structure
      const tokenData = result.data?.TokenSupplyUpdates?.[0]?.TokenSupplyUpdate?.[0];
      
      if (!tokenData) {
        throw new Error("No token supply data found");
      }
      
      const totalSupply = formatTokenAmount(tokenData.PostBalance);
      // In this example, we're using a fixed percentage of the total supply as circulating
      // In a real implementation, you would fetch this from a separate API endpoint
      const circulatingSupply = formatTokenAmount(
        (Number(tokenData.PostBalance) * 0.72).toString() // 72% of total supply
      );
      
      setSupplyData({
        totalSupply,
        circulatingSupply,
        tokenName: tokenData.Currency.Name || "APE",
        lastUpdated: new Date().toLocaleString(),
      });
      
      // Reset retry count on success
      setRetryCount(0);
      
      toast({
        title: "Supply data updated",
        description: "Latest token supply data has been fetched",
      });
    } catch (err) {
      console.error("Error fetching supply data:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch the latest token supply data");
      setRetryCount((prev) => prev + 1);
      
      // Fallback to hardcoded values on error for better UX
      setSupplyData({
        totalSupply: "1,000,000,000",
        circulatingSupply: "720,013,915",
        tokenName: "APE",
        lastUpdated: new Date().toLocaleString() + " (estimated)",
      });
      
      toast({
        title: "Using estimated supply data",
        description: "Couldn't fetch latest information - showing approximate values",
        variant: "destructive",
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
        <h4 className="text-md font-semibold">Live Supply Check</h4>
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
      
      {error ? (
        <Alert variant="destructive" className="mb-2">
          <AlertDescription>
            {error}
            <div className="text-xs mt-1">
              {retryCount > 2 ? "Multiple attempts failed. Using fallback data." : "Using fallback data. Refresh to try again."}
            </div>
          </AlertDescription>
        </Alert>
      ) : (
        <div className="bg-muted/50 p-4 rounded-md border">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm">Total Supply:</div>
            <div className="text-sm font-semibold text-right">{supplyData.totalSupply || "Loading..."} {supplyData.tokenName}</div>
            
            <div className="text-sm">Circulating Supply:</div>
            <div className="text-sm font-semibold text-right">{supplyData.circulatingSupply || "Loading..."} {supplyData.tokenName}</div>
            
            <div className="text-sm col-span-2 mt-2 text-xs text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Last updated: {supplyData.lastUpdated || "Never"}</span>
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
      )}
    </div>
  );
};

export default TotalSupplyCheck;
