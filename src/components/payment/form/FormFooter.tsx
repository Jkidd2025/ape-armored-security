
import DisclaimerBox from "@/components/payment/DisclaimerBox";
import PaymentSubmitButton from "@/components/payment/PaymentSubmitButton";
import { useIsMobile } from "@/hooks/use-mobile";

interface FormFooterProps {
  isSubmitting: boolean;
}

const FormFooter = ({ isSubmitting }: FormFooterProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`flex flex-col ${isMobile ? 'gap-4' : 'gap-6'}`}>
      <DisclaimerBox />
      <PaymentSubmitButton isSubmitting={isSubmitting} />
    </div>
  );
};

export default FormFooter;
