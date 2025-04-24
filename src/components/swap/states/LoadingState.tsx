
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

export const LoadingState = () => {
  const [message, setMessage] = useState("Connecting to Solana network...");
  const [dots, setDots] = useState("");
  
  useEffect(() => {
    // Create animating dots to show progress
    const dotInterval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    
    // Change message after a few seconds if it's taking too long
    const messageTimeout = setTimeout(() => {
      setMessage("Loading token data");
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
            <p className="text-xs text-muted-foreground mt-2">
              This may take a moment
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
