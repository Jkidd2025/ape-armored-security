
import { RefreshCcw, Settings, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SwapHeaderProps {
  onRefresh: () => void;
  onSettingsClick: () => void;
  isLoadingPrice: boolean;
  fromAmount?: string;
  hasError?: boolean;
}

export const SwapHeader = ({
  onRefresh,
  onSettingsClick,
  isLoadingPrice,
  fromAmount,
  hasError = false,
}: SwapHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center">
        <h2 className="text-lg font-medium">Swap</h2>
        {hasError && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <AlertTriangle size={16} className="text-destructive ml-2" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Network connectivity issues detected</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="flex space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onRefresh}
          className="text-apearmor-teal hover:text-apearmor-teal/80"
          disabled={isLoadingPrice || !fromAmount}
        >
          <RefreshCcw size={18} className={isLoadingPrice ? "animate-spin" : ""} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onSettingsClick}
          className="text-apearmor-teal hover:text-apearmor-teal/80"
        >
          <Settings size={18} />
        </Button>
      </div>
    </div>
  );
};
