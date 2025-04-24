
import { Card } from "@/components/ui/card";

export const LoadingState = () => {
  return (
    <div className="max-w-md mx-auto">
      <Card className="p-6 border border-apearmor-darkbronze bg-muted">
        <div className="flex justify-center items-center h-60">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-apearmor-teal border-r-2 mb-4 mx-auto"></div>
            <p>Connecting to Solana network...</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
