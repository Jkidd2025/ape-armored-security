
import { Button } from "@/components/ui/button";

interface PaymentSubmitButtonProps {
  isSubmitting: boolean;
}

const PaymentSubmitButton = ({ isSubmitting }: PaymentSubmitButtonProps) => {
  return (
    <Button 
      type="submit" 
      className="w-full bg-apearmor-teal hover:bg-apearmor-teal/80 text-black"
      disabled={isSubmitting}
    >
      {isSubmitting ? "Processing..." : "Complete Payment"}
    </Button>
  );
};

export default PaymentSubmitButton;
