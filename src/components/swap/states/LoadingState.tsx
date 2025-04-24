
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

export const LoadingState = () => {
  const [message, setMessage] = useState("Connecting to Solana network...");
  const [dots, setDots] = useState("");
  const [attemptCount, setAttemptCount] = useState(0);
  const [showFallbackMessage, setShowFallbackMessage] = useState(false);
  
  useEffect(() => {
    // Create animating dots to show progress
    const dotInterval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    
    // Change message after a few seconds if it's taking too long
    const messageTimeout = setTimeout(() => {
      setMessage("Loading token data");
      
      // After another delay, update the message if still loading
      const secondTimeout = setTimeout(() => {
        setAttemptCount(prev => prev + 1);
        setMessage("Attempting to fetch token data");
        
        // Show fallback message after two more seconds
        const fallbackTimeout = setTimeout(() => {
          setShowFallbackMessage(true);
        }, 2000);
        
        return () => clearTimeout(fallbackTimeout);
      }, 4000);
      
      return () => clearTimeout(secondTimeout);
    }, 3000);
    
    return () => {
      clearInterval(dotInterval);
      clearTimeout(messageTimeout);
    };
  }, []);
  
  return (
    <div className="max-w-md mx-auto">
      <Card className="p-6 border border-apearmor-darkbronze bg-muted">
        <div className="flex justify-center items-center h-60">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-apearmor-teal border-r-2 mb-4 mx-auto"></div>
            <p>{message}{dots}</p>
            {showFallbackMessage && (
              <p className="text-amber-500 mt-2">
                API may be unavailable. Loading fallback token data...
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              {attemptCount > 0 ? 
                `Attempt ${attemptCount} - This may take a moment or fallback data will be used` : 
                "This may take a moment"}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
