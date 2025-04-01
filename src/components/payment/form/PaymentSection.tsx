
import PaymentMethodSection from "@/components/payment/PaymentMethodSection";
import { useIsMobile } from "@/hooks/use-mobile";

interface PaymentSectionProps {
  signatureHash: string;
  error: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaymentSection = ({ signatureHash, error, onChange }: PaymentSectionProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`${isMobile ? 'py-2' : 'py-4'}`}>
      <PaymentMethodSection 
        signatureHash={signatureHash}
        error={error}
        onChange={onChange}
      />
    </div>
  );
};

export default PaymentSection;
