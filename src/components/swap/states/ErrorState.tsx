
import { AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ErrorStateProps {
  onRetry: () => void;
  title?: string;
  description?: string;
  error?: Error | null;
}

export const ErrorState = ({ 
  onRetry, 
  title = "Service Temporarily Unavailable",
  description = "We're experiencing technical difficulties connecting to the token data. We're using fallback data to ensure functionality.",
  error = null
}: ErrorStateProps) => {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    setIsRetrying(true);
    try {
      await onRetry();
    } finally {
      setTimeout(() => setIsRetrying(false), 1000); // Keep retry button disabled briefly
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Card className="p-6 border border-apearmor-darkbronze bg-muted">
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>
            {description}
            {error && (
              <div className="mt-2 text-xs overflow-hidden text-ellipsis">
                <details>
                  <summary>Technical details</summary>
                  <code className="block mt-1 p-2 bg-black/10 rounded overflow-auto max-h-24">
                    {error.message}
                  </code>
                </details>
              </div>
            )}
          </AlertDescription>
        </Alert>
        <Button 
          className="w-full mt-4" 
          variant="default" 
          onClick={handleRetry}
          disabled={isRetrying}
        >
          {isRetrying ? (
            <span className="flex items-center">
              <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-current border-r-2 mr-2"></span>
              Retrying...
            </span>
          ) : "Retry"}
        </Button>
      </Card>
    </div>
  );
};
