
import { AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  onRetry: () => void;
  title?: string;
  description?: string;
}

export const ErrorState = ({ 
  onRetry, 
  title = "Service Temporarily Unavailable",
  description = "We're experiencing technical difficulties. Please try again later or contact support if the issue persists."
}: ErrorStateProps) => {
  return (
    <div className="max-w-md mx-auto">
      <Card className="p-6 border border-apearmor-darkbronze bg-muted">
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{description}</AlertDescription>
        </Alert>
        <Button className="w-full mt-4" variant="default" onClick={onRetry}>
          Retry
        </Button>
      </Card>
    </div>
  );
};
