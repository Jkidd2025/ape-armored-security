
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SwapArrowsProps {
  onSwitch: () => void;
  disabled?: boolean;
}

export const SwapArrows = ({ onSwitch, disabled = false }: SwapArrowsProps) => {
  return (
    <div className="flex justify-center -my-2 z-10 relative">
      <Button
        variant="outline"
        size="icon"
        onClick={onSwitch}
        className="rounded-full h-8 w-8 border border-apearmor-darkbronze bg-muted hover:bg-apearmor-teal/10"
        disabled={disabled}
      >
        <ArrowDown size={16} className="text-apearmor-teal" />
      </Button>
    </div>
  );
};
