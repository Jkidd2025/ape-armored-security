
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

export const LoadingState = () => {
  const [message, setMessage] = useState("Connecting to Solana network...");
  const [dots, setDots] = useState("");
  const [attemptCount, setAttemptCount] = useState(0);
  const [showFallbackMessage, setShowFallbackMessage] = useState(false);
  const [showRetryButton, setShowRetryButton] = useState(false);
  const [checkingWallets, setCheckingWallets] = useState(true);
  
  useEffect(() => {
    // Check for wallet extensions
    const checkWalletExtensions = () => {
      const hasPhantom = !!(window as any).phantom?.solana;
      const hasSolflare = !!(window as any).solflare;
      
      if (!hasPhantom && !hasSolflare) {
        setMessage("No Solana wallet extensions detected");
        setShowFallbackMessage(true);
      } else {
        setCheckingWallets(false);
      }
    };
    
    // Wait a short moment to check for wallet extensions
    setTimeout(checkWalletExtensions, 1000);
    
    // Create animating dots to show progress
    const dotInterval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    
    // Change message after a few seconds if it's taking too long
    const messageTimeout = setTimeout(() => {
      if (!checkingWallets) {
        setMessage("Loading token data");
        
        // After another delay, update the message if still loading
        const secondTimeout = setTimeout(() => {
          setAttemptCount(prev => prev + 1);
          setMessage("Attempting to fetch token data");
          
          // Show fallback message after two more seconds
          const fallbackTimeout = setTimeout(() => {
            setShowFallbackMessage(true);
            
            // Show retry button after additional delay
            const retryTimeout = setTimeout(() => {
              setShowRetryButton(true);
            }, 3000);
            
            return () => clearTimeout(retryTimeout);
          }, 2000);
          
          return () => clearTimeout(fallbackTimeout);
        }, 4000);
        
        return () => clearTimeout(secondTimeout);
      }
    }, 3000);
    
    return () => {
      clearInterval(dotInterval);
      clearTimeout(messageTimeout);
    };
  }, [checkingWallets]);
  
  const handleReload = () => {
    // Force page reload to trigger a new connection attempt
    window.location.reload();
  };
  
  return (
    <div className="max-w-md mx-auto">
      <Card className="p-6 border border-apearmor-darkbronze bg-muted">
        <div className="flex justify-center items-center h-60">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-apearmor-teal border-r-2 mb-4 mx-auto"></div>
            <p>{message}{dots}</p>
            {showFallbackMessage && (
              <>
                {!!(window as any).phantom?.solana || !!(window as any).solflare ? (
                  <p className="text-amber-500 mt-2">
                    API may be unavailable. Loading fallback token data...
                  </p>
                ) : (
                  <p className="text-amber-500 mt-2">
                    No Solana wallet extensions detected. Please install Phantom or Solflare.
                    <div className="flex gap-2 justify-center mt-3">
                      <a 
                        href="https://phantom.app/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-apearmor-teal text-black text-sm rounded hover:bg-apearmor-teal/80 transition-colors"
                      >
                        Get Phantom
                      </a>
                      <a 
                        href="https://solflare.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-apearmor-teal text-black text-sm rounded hover:bg-apearmor-teal/80 transition-colors"
                      >
                        Get Solflare
                      </a>
                    </div>
                  </p>
                )}
              </>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              {attemptCount > 0 ? 
                `Attempt ${attemptCount} - This may take a moment or fallback data will be used` : 
                "This may take a moment"}
            </p>
            
            {showRetryButton && (
              <button 
                onClick={handleReload}
                className="mt-4 px-4 py-2 bg-apearmor-teal text-black rounded hover:bg-apearmor-teal/80 transition-colors"
              >
                Retry Connection
              </button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
