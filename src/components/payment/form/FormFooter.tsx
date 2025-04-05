
import DisclaimerBox from "@/components/payment/DisclaimerBox";
import PaymentSubmitButton from "@/components/payment/PaymentSubmitButton";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

interface FormFooterProps {
  isSubmitting: boolean;
}

const FormFooter = ({ isSubmitting }: FormFooterProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`flex flex-col ${isMobile ? 'gap-4' : 'gap-6'}`}>
      <DisclaimerBox />
      <PaymentSubmitButton isSubmitting={isSubmitting} />
      <div className="relative flex items-center py-2">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-400 text-sm">or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <Button 
        type="button" 
        variant="outline"
        className="w-full border-gray-300 hover:bg-gray-50 text-gray-700 flex items-center justify-center"
        onClick={() => window.open('https://buy.stripe.com/test_00g5nJ0Zy24XabCfYY', '_blank')}
      >
        <CreditCard className="mr-2 h-4 w-4" />
        {isMobile ? "Credit Card Payment" : "Pay by Credit Card"}
      </Button>
    </div>
  );
};

export default FormFooter;
