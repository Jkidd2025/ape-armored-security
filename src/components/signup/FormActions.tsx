
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface FormActionsProps {
  onBack: () => void;
  isSubmitting: boolean;
}

const FormActions = ({ onBack, isSubmitting }: FormActionsProps) => {
  return (
    <div className="flex justify-between pt-4">
      <Button 
        type="button" 
        variant="outline" 
        className="border-apearmor-gold text-apearmor-gold hover:bg-apearmor-gold/10"
        onClick={onBack}
        disabled={isSubmitting}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <Button 
        type="submit" 
        className="bg-apearmor-teal hover:bg-apearmor-teal/80 text-black"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            Complete Signup
            <ChevronRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
};

export default FormActions;
